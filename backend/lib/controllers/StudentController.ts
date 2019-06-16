import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IStudentRepository } from "../repository/IStudentRepository";
import { Student } from "../models/Student";
import * as jwt from 'jsonwebtoken';
import * as express from "express";
import * as bcrypt from 'bcrypt';

@Provides(StudentController)
export class StudentController {
    private router;

    @Inject
    private studentRepository: IStudentRepository;

    private studentModel;

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
        this.studentModel = new Student().getModelForClass(Student);
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
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
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
        this.studentRepository.getAll()
            .then(students => {
                if (students.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(students)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        // console.log(req.body)
        this.studentRepository.getById(req.params.id)
            .then(student => res.status(this.HttpStatus_OK).json(student))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public getByMentor(req: Request, res: Response): void {
        this.studentRepository.getByMentor(req.params.id)
            .then(student => res.status(this.HttpStatus_OK).json(student))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public login(req: Request, res: Response): void {
        this.studentRepository.getByEmail(req.body.email)
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
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
        const newStudent = new this.studentModel(req.body);
        newStudent.password = bcrypt.hashSync(newStudent.password, 10)
        this.studentRepository.add(newStudent)
            .then(user =>
                jwt.sign({ user: { id: user.id, role: user.role, email: user.email } }, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.status(this.HttpStatus_Created).json(token);
                }))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        var updatedStudent = req.body;
        if (req.file) {
            updatedStudent.profilePicture = 'http://localhost:'+process.env.DEV_APP_PORT+"/"+req.file.path
        }
        if (req.body.password) {
            updatedStudent.password = bcrypt.hashSync(req.body.password, 10)
        }
        this.studentRepository.update(req.params.id, updatedStudent)
            .then(updatedStudent => res.status(this.HttpStatus_OK).json(updatedStudent))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.studentRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            .get('/mentor/:id', this.middleware.checkAuth, this.getByMentor.bind(this))
            .post('/login', this.login.bind(this))
            .post('/register', this.add.bind(this))
            .put('/:id', this.middleware.checkAuth, this.upload.single('profilePicture'), this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.middleware.authorizeStudent, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}