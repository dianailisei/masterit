import { ICrudRepository } from "./ICrudRepository";
import { Sprint } from "models/Sprint";

export abstract class ISprintRepository extends ICrudRepository<Sprint> {
    abstract getAllByMentor(mentorId: string): Promise<Sprint[]>;
    abstract getLastSprint(mentorId: string): Promise<Sprint[]>;
}