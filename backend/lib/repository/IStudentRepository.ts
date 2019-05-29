import { ICrudRepository } from "./ICrudRepository";
import { Student } from "models/Student";

export abstract class IStudentRepository extends ICrudRepository<Student> {
}