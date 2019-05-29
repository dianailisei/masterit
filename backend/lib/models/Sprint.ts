import { prop, Typegoose, Ref } from 'typegoose';

export class Sprint extends Typegoose {
    @prop({required: true})
    number: string;

    @prop({required: true})
    pointsGiven: string;

    @prop()
    pointsAccomplished: string;

    @prop({ required: true })
    noOfDays: string;

    @prop()
    startDate: Date;

    @prop()
    endDate: Date;
    
    @prop({default: Date.now})
    creationDate: Date;
}