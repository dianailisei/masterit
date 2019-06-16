import studentService from "../api-services/studentService";
import mentorService from "../api-services/mentorService";
import sprintService from "../api-services/sprintService";
import questionService from "../api-services/QuestionService";
import goodPracticeService from "../api-services/GoodPracticeService";
import FeedbackService from "../api-services/FeedbackService";
import CourseService from "../api-services/CourseService";

const SET_USER = (context, payload) => {
    // console.log(payload.user.id)
    if (payload.user.role === "mentor") {
        mentorService.getById(payload.user.id, payload.token).then(res => context.commit("SET_USER", res.data))
    } else { studentService.getById(payload.user.id, payload.token).then(res => context.commit("SET_USER", res.data)) }
}

const SET_LAST_SPRINT = (context, payload) => {
    sprintService.getLastSprint(payload.user.id, payload.token).then(res => {
        if (res.data === "") {
            context.commit("SET_LAST_SPRINT", undefined)
        }
        else {
            context.commit("SET_LAST_SPRINT", res.data[0])
        }
    }).catch(err => console.log(err));
}
const RESET_STATE = ({ commit }) => {
    commit("RESET_STATE")
}
const SET_TEAM = (context, payload) => {
    if (payload.team !== []) {
        let students = [];
        payload.team.forEach(s => studentService.getById(s, payload.token).then(res => {
            students.push(res.data)
            context.commit("SET_TEAM", students)
        }))
    }
    else {
        context.commit("SET_TEAM", [])
    }
}

const SET_QUESTIONS = (context, payload) => {
    questionService.getAll(payload).then(res => context.commit("SET_QUESTIONS", res.data))
}
const SET_GOOD_PRACTICES = (context, payload) => {
    goodPracticeService.getByMentorId(payload.id, payload.token).then(res => context.commit("SET_GOOD_PRACTICES", res.data[0]))
}

const SET_LAST_FEEDBACK = (context, payload) => {
    FeedbackService.getLastFeedback(payload.id, payload.token).then(res => {
        context.commit("SET_LAST_FEEDBACK", res.data)
    })
}

const SET_FEEDBACK_TESTS = (context, payload) => {
    FeedbackService.getByMentorId(payload.id, payload.token).then(res => {
        context.commit("SET_FEEDBACK_TESTS", res.data)
    })
}

const SET_COURSES = (context, payload) => {
    CourseService.getAll(payload.token).then(res => {
        let courses = {};
        res.data.forEach(c => courses[c._id] = c.name);
        context.commit("SET_COURSES", courses)
    })
}
export default {
    SET_USER, SET_LAST_SPRINT, RESET_STATE, SET_TEAM, SET_QUESTIONS, SET_GOOD_PRACTICES, SET_LAST_FEEDBACK, SET_FEEDBACK_TESTS,
    SET_COURSES
}