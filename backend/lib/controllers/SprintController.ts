import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { ISprintRepository } from "../repository/ISprintRepository";
import { Sprint } from "../models/Sprint";

@Provides(SprintController)
export class SprintController {
    private router: Router;

    @Inject
    private sprintRepository: ISprintRepository;

    private sprintModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.sprintModel = new Sprint().getModelForClass(Sprint);
    }

    public getAll(req: Request, res: Response): void {
        this.sprintRepository.getAll()
            .then(sprints => {
                if(sprints.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(sprints)
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
        const newSprint = new this.sprintModel(req.body);

        this.sprintRepository.add(newSprint)
            .then(sprint => res.status(this.HttpStatus_Created).json(sprint))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.sprintRepository.update(req.params.id, req.body)
            .then(updatedSprint => res.status(this.HttpStatus_OK).json(updatedSprint))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.sprintRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }


    private init(): any {
        this.router.get('/', this.getAll.bind(this))
            .get('/:id', this.getById.bind(this))
            .post('/', this.add.bind(this))
            .put('/:id', this.update.bind(this))
            .delete('/:id', this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}