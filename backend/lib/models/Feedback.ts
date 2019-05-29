import { prop, Typegoose, Ref} from 'typegoose';
import { Sprint } from './Sprint';

export class Feedback extends Typegoose {
    @prop({ required: true, ref: Sprint })
    sprintId: Ref<Sprint>;
    
    @prop()
    results: object[];
    
    @prop({ default: Date.now })
    creationDate: Date;
}