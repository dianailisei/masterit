import { Student } from "../models/Student";
import { Provides } from "typescript-ioc";
import { IStudentRepository } from "./IStudentRepository";

@Provides(IStudentRepository)
export class StudentRepository implements IStudentRepository {
    
    private StudentModel;

    constructor() {
        this.StudentModel = new Student().getModelForClass(Student);
    }

    public getAll(): Promise<Student[]> {
        return this.StudentModel.find().exec();
    }    
    
    public getById(id: string): Promise<Student> {
        return this.StudentModel.findById(id).exec();
    }

    public getByEmail(email: string): Promise<Student> {
        return this.StudentModel.findOne({email}).exec();
    }

    public add(document: Student): Promise<Student> {
        let newStudent = new this.StudentModel(document);
        return newStudent.save();
    }

    public update(id: string, document: any): Promise<Student> {
        return this.StudentModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Student> {
        return this.StudentModel.findByIdAndRemove(id).exec();
    }

}