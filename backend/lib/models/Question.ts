import { prop, Typegoose, Ref, ModelType } from 'typegoose';
import { Course } from './Course';

export class Question extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Question>>): Promise<Question[]> {
        return this._id
    }
    @prop({required: true})
    question: string;

    @prop({required: true})
    answers: string[];

    @prop({ required: true})
    correctAnswers: string[];

    @prop()
    snnipet: Boolean;

    @prop()
    snippetContent: string;

    @prop({required: true, ref: Course})
    courseId: Ref<Course>;

    @prop({required: true})
    visible: Boolean

    @prop({default: Date.now})
    creationDate: Date;
}