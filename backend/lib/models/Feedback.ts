import { prop, Typegoose, Ref, ModelType} from 'typegoose';
import { Sprint } from './Sprint';
import { Mentor } from './Mentor';

export class Feedback extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Feedback>>): Promise<Feedback[]> {
        return this._id
    }
    @prop({ required: true, ref: Sprint })
    sprintId: Ref<Sprint>;

    @prop({required:true, ref: Mentor})
    mentorId: Ref<Mentor>;

    @prop({required: true})
    questions: Array<String>;

    @prop()
    results: Array<Array<String>>;
    
    @prop({ default: Date.now })
    creationDate: Date;
}