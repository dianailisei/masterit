import { prop, Typegoose, Ref, ModelType} from 'typegoose';
import { Mentor } from './Mentor';

export class GoodPractice extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<GoodPractice>>): Promise<GoodPractice[]> {
        return this._id
    } 

    @prop({ required: true, ref: Mentor })
    mentorId: Ref<Mentor>;
    
    @prop({ required: true})
    rules: string[];
    
    @prop({ default: Date.now })
    creationDate: Date;
}