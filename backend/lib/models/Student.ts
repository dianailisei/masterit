import { prop, Typegoose, Ref } from 'typegoose';
import { Mentor } from './Mentor';
import { Course } from './Course';

export class Student extends Typegoose {
    @prop({required: true})
    firstName: string;

    @prop({required: true})
    lastName: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop({ ref: Mentor})
    mentorId: Ref<Mentor>;

    @prop({ ref: Course})
    courseId: Ref<Course>;
    
    @prop({default: Date.now})
    creationDate: Date;
}