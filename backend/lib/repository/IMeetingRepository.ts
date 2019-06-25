import { ICrudRepository } from "./ICrudRepository";
import { Meeting } from "../models/Meeting";

export abstract class IMeetingRepository extends ICrudRepository<Meeting> {
    // abstract getLastMeeting(mentorId: string): Promise<Meeting>;
    abstract getMeetingByMentor(mentorId: string): Promise<Meeting[]>;
}