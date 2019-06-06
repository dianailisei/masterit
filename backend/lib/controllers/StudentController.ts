import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IStudentRepository } from "../repository/IStudentRepository";
import { Student } from "../models/Student";
import * as jwt from 'jsonwebtoken';
import * as express from "express";
@Provides(StudentController)
export class StudentController {
    private router;

    @Inject
    private studentRepository: IStudentRepository;

    private studentModel;

    private middleware;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    private readonly HttpStatus_Unauthorized = 401;

    constructor() {
        this.router = express.Router();
        this.studentModel = new Student().getModelForClass(Student);
        this.middleware = require('../middleware/jwt');
        this.init();
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

    public login(req: Request, res: Response): void {
        this.studentRepository.getByEmail(req.body.email)
            .then(user => {
                if (user.password === req.body.password) {
                    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
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
        this.studentRepository.add(newStudent)
            .then(user =>
                jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.status(this.HttpStatus_Created).json(token);
                }))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.studentRepository.update(res.locals.tokenData.user._id, req.body)
            .then(updatedStudent => res.status(this.HttpStatus_OK).json(updatedStudent))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.studentRepository.delete(res.locals.tokenData.user._id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }


    private init(): any {
        this.router.get('/all', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            .post('/login', this.login.bind(this))
            .post('/register', this.add.bind(this))
            .put('/update', this.middleware.checkAuth, this.middleware.authorizeStudent, this.update.bind(this))
            .delete('/', this.middleware.checkAuth, this.middleware.authorizeStudent, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}