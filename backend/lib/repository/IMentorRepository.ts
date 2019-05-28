import { ICrudRepository } from "./ICrudRepository";
import { Mentor } from "models/Mentor";

export abstract class IMentorRepository extends ICrudRepository<Mentor> {
    //abstract getMentorsByCity(city: string): Promise<Mentor[]>;
}