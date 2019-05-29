import { prop, Typegoose, Ref } from 'typegoose';
import { Course } from './Course';

export class Question extends Typegoose {
    @prop({required: true})
    text: string;

    @prop({required: true})
    answers: string[];

    @prop({ required: true})
    correctAnswers: string[];

    @prop()
    snnipet: string;

    @prop({required: true, ref: Course})
    courseId: Ref<Course>;

    @prop({default: Date.now})
    creationDate: Date;
}