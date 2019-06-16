import { Feedback } from "../models/Feedback";
import { Provides } from "typescript-ioc";
import { IFeedbackRepository } from "./IFeedbackRepository";

@Provides(IFeedbackRepository)
export class FeedbackRepository implements IFeedbackRepository {
    getFeedbackByMentor(mentorId: string): Promise<Feedback[]> {
        return this.FeedbackModel.find({mentorId}).exec();
    }

    getLastFeedback(mentorId: string): Promise<Feedback> {
        return this.FeedbackModel.findOne({mentorId}).sort({creationDate: -1}).exec();
    }
    
    private FeedbackModel;

    constructor() {
        this.FeedbackModel = new Feedback().getModelForClass(Feedback);
    }

    public getAll(): Promise<Feedback[]> {
        return this.FeedbackModel.find().exec();
    }    
    
    public getById(id: string): Promise<Feedback> {
        return this.FeedbackModel.findById(id).exec();
    }

    public add(document: Feedback): Promise<Feedback> {
        let newFeedback = new this.FeedbackModel(document);
        return newFeedback.save();
    }

    public update(id: string, document: any): Promise<Feedback> {
        return this.FeedbackModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Feedback> {
        return this.FeedbackModel.findByIdAndRemove(id).exec();
    }

}