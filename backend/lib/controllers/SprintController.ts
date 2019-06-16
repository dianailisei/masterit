import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { ISprintRepository } from "../repository/ISprintRepository";
import { Sprint } from "../models/Sprint";
import * as express from "express";
import * as mongoose from "mongoose";
@Provides(SprintController)
export class SprintController {
    private router: Router;

    @Inject
    private sprintRepository: ISprintRepository;

    private sprintModel;

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
        this.sprintModel = new Sprint().getModelForClass(Sprint);
    }

    public getAllByMentor(req: Request, res: Response): void {
        this.sprintRepository.getAllByMentor(req.params.id)
            .then(sprints => {
                if (sprints.length === 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(sprints)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getLastSprint(req: Request, res: Response): void {
        this.sprintRepository.getLastSprint(req.params.id)
            .then(sprint => {
                if (sprint.length === 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(sprint)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.sprintRepository.getById(req.params.id)
            .then(sprint => res.status(this.HttpStatus_OK).json(sprint))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        console.log(req.body)
        const newSprint = new this.sprintModel(req.body);
        console.log(newSprint)
        this.sprintRepository.add(newSprint)
            .then(sprint => res.status(this.HttpStatus_Created).json(sprint))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.sprintRepository.update(req.body.id, req.body)
            .then(updatedSprint => res.status(this.HttpStatus_OK).json(updatedSprint))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.sprintRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAllByMentor.bind(this))
            .get('/mentor/:id', this.middleware.checkAuth, this.getLastSprint.bind(this))
            .get('/mentor/all/:id',  this.middleware.checkAuth, this.getAllByMentor.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            .post('/', this.middleware.checkAuth, this.middleware.authorizeMentor, this.add.bind(this))
            .put('/', this.middleware.checkAuth, this.middleware.authorizeMentor, this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.middleware.authorizeMentor, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}