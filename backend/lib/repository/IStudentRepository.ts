import { ICrudRepository } from "./ICrudRepository";
import { Student } from "models/Student";

export abstract class IStudentRepository extends ICrudRepository<Student> {
    abstract getByEmail(email: string): Promise<Student>;
    abstract getByMentor(id: string): Promise<Student[]>;
}