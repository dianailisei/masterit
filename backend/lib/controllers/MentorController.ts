import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IMentorRepository } from "../repository/IMentorRepository";
import { Mentor } from "../models/Mentor";

@Provides(MentorController)
export class MentorController {
    private router: Router;

    @Inject
    private mentorRepository: IMentorRepository;

    private mentorModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.mentorModel = new Mentor().getModelForClass(Mentor);
    }

    public getAll(req: Request, res: Response): void {
        this.mentorRepository.getAll()
            .then(mentors => {
                if(mentors.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(mentors)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.mentorRepository.getById(req.params.id)
            .then(mentor => res.status(this.HttpStatus_OK).json(mentor))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newMentor = new this.mentorModel(req.body);

        this.mentorRepository.add(newMentor)
            .then(mentor => res.status(this.HttpStatus_Created).json(mentor))
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