import { prop, Typegoose, Ref, ModelType } from 'typegoose';
import { Mentor } from './Mentor';

export class Sprint extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Sprint>>): Promise<Sprint[]> {
        return this._id
    }

    @prop({required: true})
    number: string;

    @prop({required: true})
    pointsGiven: string;

    @prop({required: true})
    mentor: string;

    @prop()
    pointsDone: string;

    @prop()
    startDate: Date;

    @prop()
    endDate: Date;

    @prop()
    endedEarlier: Boolean;

    @prop()
    ended: Boolean;
    
    @prop({default: Date.now})
    creationDate: Date;
}