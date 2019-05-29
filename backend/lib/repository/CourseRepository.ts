import { Course } from "../models/Course";
import { Provides } from "typescript-ioc";
import { ICourseRepository } from "./ICourseRepository";

@Provides(ICourseRepository)
export class CourseRepository implements ICourseRepository {
    
    private CourseModel;

    constructor() {
        this.CourseModel = new Course().getModelForClass(Course);
    }

    public getAll(): Promise<Course[]> {
        return this.CourseModel.find().exec();
    }    
    
    public getById(id: string): Promise<Course> {
        return this.CourseModel.findById(id).exec();
    }

    public add(document: Course): Promise<Course> {
        let newCourse = new this.CourseModel(document);
        return newCourse.save();
    }

    public update(id: string, document: any): Promise<Course> {
        return this.CourseModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Course> {
        return this.CourseModel.findByIdAndRemove(id).exec();
    }

}