import { prop, Typegoose, Ref } from 'typegoose';
import { Mentor } from './Mentor';

export class Sprint extends Typegoose {
    @prop({required: true})
    number: string;

    @prop({required: true})
    pointsGiven: string;

    @prop({required: true, ref: Mentor})
    mentorId: Ref<Mentor>;

    @prop()
    pointsAccomplished: string;

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