import { GoodPractice } from "../models/GoodPractice";
import { Provides } from "typescript-ioc";
import { IGoodPracticeRepository } from "./IGoodPracticeRepository";

@Provides(IGoodPracticeRepository)
export class GoodPracticeRepository implements IGoodPracticeRepository {
    getByMentorId(id: string): Promise<GoodPractice> {
        return this.GoodPracticeModel.find({mentorId: id}).exec();
    }
    
    private GoodPracticeModel;

    constructor() {
        this.GoodPracticeModel = new GoodPractice().getModelForClass(GoodPractice);
    }

    public getAll(): Promise<GoodPractice[]> {
        return this.GoodPracticeModel.find().exec();
    }    
    
    public getById(id: string): Promise<GoodPractice> {
        return this.GoodPracticeModel.findById(id).exec();
    }

    public add(document: GoodPractice): Promise<GoodPractice> {
        let newGoodPractice = new this.GoodPracticeModel(document);
        return newGoodPractice.save();
    }

    public update(id: string, document: any): Promise<GoodPractice> {
        return this.GoodPracticeModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<GoodPractice> {
        return this.GoodPracticeModel.findByIdAndRemove(id).exec();
    }

}