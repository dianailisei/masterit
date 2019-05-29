import { prop, Typegoose, Ref } from 'typegoose';
import { Student } from './Student';

export class Mentor extends Typegoose {
    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop({ ref: Student})
    team: Ref<Student>[];

    @prop({ default: Date.now })
    creationDate: Date;
}