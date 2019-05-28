import { Container } from "typescript-ioc";
import { MentorRepository } from "../repository/MentorRepository";
import { IMentorRepository } from "../repository/IMentorRepository";
import { StudentRepository } from "../repository/StudentRepository";
import { IStudentRepository } from "../repository/IStudentRepository";
export class IocContainerConfig {

    static configure() {
        Container.bind(IMentorRepository).to(MentorRepository);
        Container.bind(IStudentRepository).to(StudentRepository);
    }
}