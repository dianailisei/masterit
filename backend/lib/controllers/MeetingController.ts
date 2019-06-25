import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IMeetingRepository } from "../repository/IMeetingRepository";
import { Meeting } from "../models/Meeting";
import * as express from "express";
@Provides(MeetingController)
export class MeetingController {
    private router: Router;

    @Inject
    private meetingRepository: IMeetingRepository;

    private meetingModel;

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
        this.meetingModel = new Meeting().getModelForClass(Meeting);
    }

    public getAll(req: Request, res: Response): void {
        this.meetingRepository.getAll()
            .then(Meetings => {
                if (Meetings.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(Meetings)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.meetingRepository.getById(req.params.id)
            .then(Meeting => res.status(this.HttpStatus_OK).json(Meeting))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    // public getLastMeeting(req: Request, res: Response): void {
    //     this.MeetingRepository.getLastMeeting(req.params.id)
    //         .then(Meeting => res.status(this.HttpStatus_OK).json(Meeting))
    //         .catch(() => res.status(this.HttpStatus_NotFound).send());
    // }

    public getByMentor(req: Request, res: Response): void {
        this.meetingRepository.getMeetingByMentor(req.params.id)
            .then(Meeting => res.status(this.HttpStatus_OK).json(Meeting))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newMeeting = new this.meetingModel(req.body);

        this.meetingRepository.add(newMeeting)
            .then(Meeting => res.status(this.HttpStatus_Created).json(Meeting))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.meetingRepository.update(req.params.id, req.body)
            .then(updatedMeeting => res.status(this.HttpStatus_OK).json(updatedMeeting))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.meetingRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            // .get('/mentor/:id', this.middleware.checkAuth, this.getLastMeeting.bind(this))
            .get('/mentor/all/:id', this.middleware.checkAuth, this.getByMentor.bind(this))
            .post('/', this.middleware.checkAuth, this.middleware.authorizeMentor, this.add.bind(this))
            .put('/:id', this.middleware.checkAuth, this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}