import { ICrudRepository } from "./ICrudRepository";
import { Sprint } from "models/Sprint";

export abstract class ISprintRepository extends ICrudRepository<Sprint> {
    abstract getAllByMentor(mentor: string): Promise<Sprint[]>;
    abstract getLastSprint(mentor: string): Promise<Sprint[]>;
}