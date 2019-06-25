import { Meeting } from "../models/Meeting";
import { Provides } from "typescript-ioc";
import { IMeetingRepository } from "./IMeetingRepository";

@Provides(IMeetingRepository)
export class MeetingRepository implements IMeetingRepository {
    getMeetingByMentor(mentorId: string): Promise<Meeting[]> {
        return this.MeetingModel.find({mentorId}).exec();
    }

    // getLastMeeting(mentorId: string): Promise<Meeting> {
    //     return this.MeetingModel.findOne({mentorId}).sort({creationDate: -1}).exec();
    // }
    
    private MeetingModel;

    constructor() {
        this.MeetingModel = new Meeting().getModelForClass(Meeting);
    }

    public getAll(): Promise<Meeting[]> {
        return this.MeetingModel.find().exec();
    }    
    
    public getById(id: string): Promise<Meeting> {
        return this.MeetingModel.findById(id).exec();
    }

    public add(document: Meeting): Promise<Meeting> {
        let newMeeting = new this.MeetingModel(document);
        return newMeeting.save();
    }

    public update(id: string, document: any): Promise<Meeting> {
        return this.MeetingModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Meeting> {
        return this.MeetingModel.findByIdAndRemove(id).exec();
    }

}