import { ICrudRepository } from "./ICrudRepository";
import { GoodPractice } from "models/GoodPractice";

export abstract class IGoodPracticeRepository extends ICrudRepository<GoodPractice> {
    abstract getByMentorId(id: string): Promise<GoodPractice>;
}