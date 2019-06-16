import { prop, Typegoose, Ref, ModelType } from 'typegoose';
import { Mentor } from './Mentor';
import { Course } from './Course';

export class Student extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Student>>): Promise<Student[]> {
        return this._id
    }

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
    
    @prop({required:true})
    role: string;

    @prop({required:true})
    submittedExam: Boolean;

    @prop()
    score: string;

    @prop()
    profilePicture: string;
    
    @prop({default: Date.now})
    creationDate: Date;
}