import { prop, Typegoose } from 'typegoose';

export class Mentor extends Typegoose {
    @prop({required: true})
    firstName: string;

    @prop({required: true})
    lastName: string;

    @prop({default: Date.now})
    creationDate: Date;
}