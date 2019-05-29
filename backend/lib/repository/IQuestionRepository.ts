import { ICrudRepository } from "./ICrudRepository";
import { Question } from "models/Question";

export abstract class IQuestionRepository extends ICrudRepository<Question> {
    
}