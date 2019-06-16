import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IGoodPracticeRepository } from "../repository/IGoodPracticeRepository";
import { GoodPractice } from "../models/GoodPractice";
import * as express from "express";

@Provides(GoodPracticeController)
export class GoodPracticeController {
    private router: Router;

    @Inject
    private goodPracticeRepository: IGoodPracticeRepository;

    private goodPracticeModel;

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
        this.goodPracticeModel = new GoodPractice().getModelForClass(GoodPractice);
    }

    public getAll(req: Request, res: Response): void {
        this.goodPracticeRepository.getAll()
            .then(goodPractices => {
                if (goodPractices.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(goodPractices)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.goodPracticeRepository.getById(req.params.id)
            .then(GoodPractice => res.status(this.HttpStatus_OK).json(GoodPractice))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public getByMentor(req: Request, res: Response): void {
        this.goodPracticeRepository.getByMentorId(req.params.id)
            .then(GoodPractice => res.status(this.HttpStatus_OK).json(GoodPractice))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newGoodPractice = new this.goodPracticeModel(req.body);
        this.goodPracticeRepository.add(newGoodPractice)
            .then(GoodPractice => res.status(this.HttpStatus_Created).json(GoodPractice))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.goodPracticeRepository.update(req.params.id, req.body)
            .then(updatedGoodPractice => res.status(this.HttpStatus_OK).json(updatedGoodPractice))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.goodPracticeRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }


    private init(): any {
        this.router.get('/', this.middleware.checkAuth, this.getAll.bind(this))
            .get('/:id', this.middleware.checkAuth, this.getById.bind(this))
            .get('/mentor/:id', this.middleware.checkAuth, this.getByMentor.bind(this))
            .post('/', this.middleware.checkAuth, this.middleware.authorizeMentor, this.add.bind(this))
            .put('/:id', this.middleware.checkAuth, this.update.bind(this))
            .delete('/:id', this.middleware.checkAuth, this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}