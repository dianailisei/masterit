import { prop, Typegoose, ModelType} from 'typegoose';

export class Course extends Typegoose {

    @prop()
    get id( this: InstanceType<ModelType<Course>>): Promise<Course[]> {
        return this._id
    }
    
    @prop({ required: true })
    name: string;
    
    @prop({ default: Date.now })
    creationDate: Date;
}