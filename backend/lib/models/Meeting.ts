import { prop, Typegoose, ModelType, Ref} from 'typegoose';
import { Mentor } from './Mentor';

export class Meeting extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Meeting>>): Promise<Meeting[]> {
        return this._id
    }
    
    @prop()
    name: string;

    @prop()
    day: string;

    @prop({ required: true })
    hour: string;

    @prop({required:true, ref: Mentor})
    mentorId: Ref<Mentor>;
    
    @prop({ default: Date.now })
    creationDate: Date;
}