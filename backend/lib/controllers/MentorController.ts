import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IMentorRepository } from "../repository/IMentorRepository";
import { Mentor } from "../models/Mentor";
import * as jwt from 'jsonwebtoken';
import * as express from "express";
@Provides(MentorController)
export class MentorController {
    private router;

    @Inject
    private mentorRepository: IMentorRepository;

    private mentorModel;

    private middleware;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    private readonly HttpStatus_Unauthorized = 401;

    constructor() {
        this.router = express.Router();
        this.mentorModel = new Mentor().getModelForClass(Mentor);
        this.middleware = require('../middleware/jwt');
        this.init();
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
                if (user.password === req.body.password && user.approved === true) {
                    jwt.sign( {user:{ id: user.id, role: user.role, email: user.email }}, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
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
        this.mentorRepository.add(newMentor)
            .then(user => {
                jwt.sign({user:{ id: user.id, role: user.role, email: user.email }}, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.status(this.HttpStatus_Created).json(token);
                })
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.mentorRepository.update(req.params.id, req.body)
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
            .put('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}