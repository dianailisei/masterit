import { Sprint } from "../models/Sprint";
import { Provides } from "typescript-ioc";
import { ISprintRepository } from "./ISprintRepository";

@Provides(ISprintRepository)
export class SprintRepository implements ISprintRepository {
    getAllByMentor(mentor: string): Promise<Sprint[]> {
        return this.sprintModel.find({mentor}).exec();
    }
    
    getLastSprint(mentor: string): Promise<Sprint[]> {
        return this.sprintModel.find({mentor, ended: false}).exec();
    }
    
    
    private sprintModel;

    constructor() {
        this.sprintModel = new Sprint().getModelForClass(Sprint);
    }

    public getAll(): Promise<Sprint[]> {
        return this.sprintModel.find().exec();
    }    
    
    public getById(id: string): Promise<Sprint> {
        return this.sprintModel.findById(id).exec();
    }

    public add(document: Sprint): Promise<Sprint> {
        let newSprint = new this.sprintModel(document);
        return newSprint.save();
    }

    public update(id: string, document: any): Promise<Sprint> {
        return this.sprintModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Sprint> {
        return this.sprintModel.findByIdAndRemove(id).exec();
    }

}