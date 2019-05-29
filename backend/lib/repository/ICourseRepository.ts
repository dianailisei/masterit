import { ICrudRepository } from "./ICrudRepository";
import { Course } from "models/Course";

export abstract class ICourseRepository extends ICrudRepository<Course> {
    
}