import { Question } from "../models/Question";
import { Provides } from "typescript-ioc";
import { IQuestionRepository } from "./IQuestionRepository";

@Provides(IQuestionRepository)
export class QuestionRepository implements IQuestionRepository {
    deleteByCourseId(id: string): Promise<Question> {
        return this.QuestionModel.find({courseId: id}).remove().exec();
    }

    getByCourseId(id: string): Promise<Question[]> {
        return this.QuestionModel.find({courseId: id}).exec();
    }
    
    private QuestionModel;

    constructor() {
        this.QuestionModel = new Question().getModelForClass(Question);
    }

    public getAll(): Promise<Question[]> {
        return this.QuestionModel.find().exec();
    }    
    
    public getById(id: string): Promise<Question> {
        return this.QuestionModel.findById(id).exec();
    }

    public add(document: Question): Promise<Question> {
        let newQuestion = new this.QuestionModel(document);
        return newQuestion.save();
    }

    public update(id: string, document: any): Promise<Question> {
        return this.QuestionModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Question> {
        return this.QuestionModel.findByIdAndRemove(id).exec();
    }

}