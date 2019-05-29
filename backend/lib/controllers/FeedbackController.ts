import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IFeedbackRepository } from "../repository/IFeedbackRepository";
import { Feedback } from "../models/Feedback";

@Provides(FeedbackController)
export class FeedbackController {
    private router: Router;

    @Inject
    private feedbackRepository: IFeedbackRepository;

    private feedbackModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.feedbackModel = new Feedback().getModelForClass(Feedback);
    }

    public getAll(req: Request, res: Response): void {
        this.feedbackRepository.getAll()
            .then(feedbacks => {
                if(feedbacks.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(feedbacks)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.feedbackRepository.getById(req.params.id)
            .then(feedback => res.status(this.HttpStatus_OK).json(feedback))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newFeedback = new this.feedbackModel(req.body);

        this.feedbackRepository.add(newFeedback)
            .then(feedback => res.status(this.HttpStatus_Created).json(feedback))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.feedbackRepository.update(req.params.id, req.body)
            .then(updatedFeedback => res.status(this.HttpStatus_OK).json(updatedFeedback))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.feedbackRepository.delete(req.params.id)
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