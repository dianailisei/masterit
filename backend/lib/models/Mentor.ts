import { prop, Typegoose, Ref, ModelType } from 'typegoose';
import { Student } from './Student';

export class Mentor extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Mentor>>): Promise<Mentor[]> {
        return this._id
    }

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop()
    team: [];

    @prop({required: true})
    approved: Boolean;

    @prop({required: true})
    role: String;

    @prop({ default: Date.now })
    creationDate: Date;
}