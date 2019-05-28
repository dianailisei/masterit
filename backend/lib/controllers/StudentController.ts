import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { IStudentRepository } from "../repository/IStudentRepository";
import { Student } from "../models/Student";

@Provides(StudentController)
export class StudentController {
    private router: Router;

    @Inject
    private studentRepository: IStudentRepository;

    private studentModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.studentModel = new Student().getModelForClass(Student);
    }

    public getAll(req: Request, res: Response): void {
        this.studentRepository.getAll()
            .then(students => {
                if(students.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(students)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.studentRepository.getById(req.params.id)
            .then(student => res.status(this.HttpStatus_OK).json(student))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newStudent = new this.studentModel(req.body);

        this.studentRepository.add(newStudent)
            .then(student => res.status(this.HttpStatus_Created).json(student))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public update(req: Request, res: Response): void {
        this.studentRepository.update(req.params.id, req.body)
            .then(updatedStudent => res.status(this.HttpStatus_OK).json(updatedStudent))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.studentRepository.delete(req.params.id)
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