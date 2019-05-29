import { Container } from "typescript-ioc";
import { MentorRepository } from "../repository/MentorRepository";
import { IMentorRepository } from "../repository/IMentorRepository";
import { StudentRepository } from "../repository/StudentRepository";
import { IStudentRepository } from "../repository/IStudentRepository";
import { CourseRepository } from "../repository/CourseRepository";
import { ICourseRepository } from "../repository/ICourseRepository";
import { SprintRepository } from "../repository/SprintRepository";
import { ISprintRepository } from "../repository/ISprintRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { IQuestionRepository } from "../repository/IQuestionRepository";
import { FeedbackRepository } from "../repository/FeedbackRepository";
import { IFeedbackRepository } from "../repository/IFeedbackRepository";
export class IocContainerConfig {

    static configure() {
        Container.bind(IMentorRepository).to(MentorRepository);
        Container.bind(IStudentRepository).to(StudentRepository);
        Container.bind(ICourseRepository).to(CourseRepository);
        Container.bind(ISprintRepository).to(SprintRepository);
        Container.bind(IQuestionRepository).to(QuestionRepository);
        Container.bind(IFeedbackRepository).to(FeedbackRepository);
    }
}