const user = state => state.user;
const lastSprint = state => state.lastSprint;
const team = state => state.team;
const questions = state => state.questions;
const goodPractices = state => state.goodPractices;
const lastFeedbackTest = state => state.lastFeedbackTest;
const feedbackTests= state => state.feedbackTests;
const courses = state => state.courses;
const meetings = state => state.meetings;

const getSprintRemainingDays = state => {
    let diffDays = 0, diffTime;
    if (state.lastSprint !== undefined) {
        let date1 = new Date(state.lastSprint.endDate);
        let date2 = Date.now();
        let date3 = new Date(state.lastSprint.startDate);
        if (date3.getTime() > date2) {
            diffTime = Math.abs(date1.getTime() - date3.getTime());
        }
        else {
            diffTime = Math.abs(date1.getTime() - date2);
            
        }
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return diffDays||0;
}
export default {
    user,
    lastSprint,
    getSprintRemainingDays,
    team,
    questions,
    goodPractices,
    lastFeedbackTest,
    feedbackTests,
    courses,
    meetings
};