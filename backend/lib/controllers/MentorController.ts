import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IMentorRepository } from "../repository/IMentorRepository";
import { Mentor } from "../models/Mentor";
import * as jwt from 'jsonwebtoken';
import * as express from "express";
import * as bcrypt from 'bcrypt';

@Provides(MentorController)
export class MentorController {
    private router;

    @Inject
    private mentorRepository: IMentorRepository;

    private mentorModel;

    private middleware;

    private upload;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    private readonly HttpStatus_Unauthorized = 401;

    constructor() {
        this.router = express.Router();
        this.configFileUpload();
        this.mentorModel = new Mentor().getModelForClass(Mentor);
        this.middleware = require('../middleware/jwt');
        this.init();
    }

    private configFileUpload() {
        const multer = require('multer');

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
        this.upload = multer({
            storage: storage, limits: {
                fileSize: 1024 * 1024 * 5, fileFilter: fileFilter
            }
        });
    }

    public getAll(req: Request, res: Response): void {
        if (res.locals.tokenData.user.email === "admin") {
            this.mentorRepository.getAll()
                .then(mentors => {
                    if (mentors.length == 0) {
                        res.status(this.HttpStatus_NoContent).send();
                    } else {
                        res.status(this.HttpStatus_OK).json(mentors)
                    }
                })
                .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
        }
        else {
            res.status(this.HttpStatus_Unauthorized).send()
        }
    }

    public getById(req: Request, res: Response): void {
        this.mentorRepository.getById(req.params.id)
            .then(mentor => res.status(this.HttpStatus_OK).json(mentor))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public login(req: Request, res: Response): void {
        this.mentorRepository.getByEmail(req.body.email)
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password) && user.approved === true) {
                    jwt.sign({ user: { id: user.id, role: user.role, email: user.email } }, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
                        if (err) { console.log(err) }
                        res.status(this.HttpStatus_OK).json(token);
                    })
                }
                else {
                    res.status(this.HttpStatus_Unauthorized).send();
                }
            })
            .catch(() => res.status(this.HttpStatus_Unauthorized).send());
    }

    public add(req: Request, res: Response): void {
        const newMentor = new this.mentorModel(req.body);
        newMentor.password = bcrypt.hashSync(newMentor.password, 10)
        this.mentorRepository.add(newMentor)
            .then(user => {
                jwt.sign({ user: { id: user.id, role: user.role, email: user.email } }, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.status(this.HttpStatus_Created).json(token);
                })
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        var updatedMentor = req.body;
        if (req.file) {
            updatedMentor.profilePicture = 'http://localhost:'+process.env.DEV_APP_PORT+"/"+req.file.path
        }
        if (req.body.password) {
            updatedMentor.password = bcrypt.hashSync(req.body.password, 10)
        }
        this.mentorRepository.update(req.params.id, updatedMentor)
            .then(updatedMentor => res.status(this.HttpStatus_OK).json(updatedMentor))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.mentorRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.getById.bind(this))
            .post('/login', this.login.bind(this))
            .post('/register', this.add.bind(this))
            .put('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.upload.single('profilePicture'), this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}