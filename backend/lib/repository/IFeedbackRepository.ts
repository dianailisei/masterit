import { ICrudRepository } from "./ICrudRepository";
import { Feedback } from "models/Feedback";

export abstract class IFeedbackRepository extends ICrudRepository<Feedback> {
    abstract getLastFeedback(mentorId: string): Promise<Feedback>;
    abstract getFeedbackByMentor(mentorId: string): Promise<Feedback[]>;
}