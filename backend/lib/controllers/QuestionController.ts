import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IQuestionRepository } from "../repository/IQuestionRepository";
import { Question } from "../models/Question";
import * as express from "express";
@Provides(QuestionController)
export class QuestionController {
    private router: Router;

    @Inject
    private questionRepository: IQuestionRepository;

    private questionModel;

    private middleware;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = express.Router();
        this.middleware = require('../middleware/jwt');
        this.init();
        this.questionModel = new Question().getModelForClass(Question);
    }

    public getAll(req: Request, res: Response): void {
        this.questionRepository.getAll()
            .then(questions => {
                if (questions.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(questions)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.questionRepository.getById(req.params.id)
            .then(question => res.status(this.HttpStatus_OK).json(question))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public getByCourseId(req: Request, res: Response): void {
        this.questionRepository.getByCourseId(req.params.id)
            .then(question => res.status(this.HttpStatus_OK).json(question))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newQuestion = new this.questionModel(req.body);
        this.questionRepository.add(newQuestion)
            .then(question => res.status(this.HttpStatus_Created).json(question))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.questionRepository.update(req.params.id, req.body)
            .then(updatedQuestion => res.status(this.HttpStatus_OK).json(updatedQuestion))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.questionRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public deleteByCourseId(req: Request, res: Response): void {
        this.questionRepository.deleteByCourseId(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            .get('/course/:id', this.middleware.checkAuth, this.getByCourseId.bind(this))
            .post('/', this.middleware.checkAuth, this.middleware.authorizeMentor, this.add.bind(this))
            .put('/:id', this.middleware.checkAuth, this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.delete.bind(this))
            .delete('/course/:id', this.middleware.checkAuth, this.deleteByCourseId.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}