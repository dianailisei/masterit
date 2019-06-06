import { ICrudRepository } from "./ICrudRepository";
import { Question } from "models/Question";

export abstract class IQuestionRepository extends ICrudRepository<Question> {
    abstract getByCourseId(id: string): Promise<Question[]>;
    abstract deleteByCourseId(id: string): Promise<Question>;
}