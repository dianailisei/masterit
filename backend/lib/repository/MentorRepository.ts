import { Mentor } from "../models/Mentor";
import { Provides } from "typescript-ioc";
import { IMentorRepository } from "./IMentorRepository";
import { staticMethod, ModelType } from "typegoose";

@Provides(IMentorRepository)
export class MentorRepository implements IMentorRepository {
    
    private MentorModel;

    constructor() {
        this.MentorModel = new Mentor().getModelForClass(Mentor);
    }

    public getAll(): Promise<Mentor[]> {
        return this.MentorModel.find().exec();
    }

    public getById(id: string): Promise<Mentor> {
        return this.MentorModel.findById(id).exec();
    }

    public getByEmail(email: string): Promise<Mentor> {
        return this.MentorModel.findOne({email}).exec();
    }

    public add(document: Mentor): Promise<Mentor> {
        let newMentor = new this.MentorModel(document);
        return newMentor.save();
    }

    public update(id: string, document: any): Promise<Mentor> {
        return this.MentorModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Mentor> {
        return this.MentorModel.findByIdAndRemove(id).exec();
    }
}