import { prop, Typegoose} from 'typegoose';

export class Course extends Typegoose {
    @prop({ required: true })
    name: string;
    
    @prop({ default: Date.now })
    creationDate: Date;
}