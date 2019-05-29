import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { ICourseRepository } from "../repository/ICourseRepository";
import { Course } from "../models/Course";

@Provides(CourseController)
export class CourseController {
    private router: Router;

    @Inject
    private courseRepository: ICourseRepository;

    private courseModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.courseModel = new Course().getModelForClass(Course);
    }

    public getAll(req: Request, res: Response): void {
        this.courseRepository.getAll()
            .then(courses => {
                if(courses.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(courses)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.courseRepository.getById(req.params.id)
            .then(course => res.status(this.HttpStatus_OK).json(course))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newCourse = new this.courseModel(req.body);

        this.courseRepository.add(newCourse)
            .then(course => res.status(this.HttpStatus_Created).json(course))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.courseRepository.update(req.params.id, req.body)
            .then(updatedCourse => res.status(this.HttpStatus_OK).json(updatedCourse))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.courseRepository.delete(req.params.id)
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