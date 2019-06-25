import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IMeetingRepository } from "../repository/IMeetingRepository";
import * as express from "express";
import * as webpush from "web-push";
import { Meeting } from "../models/Meeting";
@Provides(NotificationController)
export class NotificationController {
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

    // public getAll(req: Request, res: Response): void {
    //     this.courseRepository.getAll()
    //         .then(courses => {
    //             if (courses.length == 0) {
    //                 res.status(this.HttpStatus_NoContent).send();
    //             } else {
    //                 res.status(this.HttpStatus_OK).json(courses)
    //             }
    //         })
    //         .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    // }

    // public getById(req: Request, res: Response): void {
    //     this.courseRepository.getById(req.params.id)
    //         .then(course => res.status(this.HttpStatus_OK).json(course))
    //         .catch(() => res.status(this.HttpStatus_NotFound).send());
    // }

    public subscribe(req: Request, res: Response): void {
        const subscription = req.body;

        res.status(this.HttpStatus_Created).json({});

        this.meetingRepository.getAll()
            .then(Meetings => {
                if (Meetings.length == 0) {
                    // res.status(this.HttpStatus_NoContent).send();
                    let payload = {};
                    webpush.sendNotification(subscription, JSON.stringify(payload)).catch(err => console.log(err))

                } else {
                    // let payload = JSON.stringify(Meetings)
                    // console.log(Meetings, typeof(Meetings), typeof(JSON.stringify(Meetings)));
                    webpush.sendNotification(subscription, JSON.stringify(Meetings)).catch(err => console.log(err))
                    // res.status(this.HttpStatus_OK).json(Meetings)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
        

    }

    // public update(req: Request, res: Response): void {
    //     this.courseRepository.update(req.params.id, req.body)
    //         .then(updatedCourse => res.status(this.HttpStatus_OK).json(updatedCourse))
    //         .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    // }

    // public delete(req: Request, res: Response): void {
    //     this.courseRepository.delete(req.params.id)
    //         .then(() => res.status(this.HttpStatus_NoContent).send())
    //         .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    // }


    private init(): any {
        this.router
            .post('/', this.subscribe.bind(this))

    }

    public getRoutes(): Router {
        return this.router;
    }
}