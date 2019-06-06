import studentService from "../api-services/studentService";
import sprintService from "../api-services/sprintService";
import questionService from "../api-services/QuestionService";
// const action1 = (context) => {
//     ...
//     context.commit('MUTATION', payload);
// };
const SET_USER = (context, payload) => {
    context.commit("SET_USER", payload);
}
const SET_LAST_SPRINT = (context, payload) => {
    sprintService.getLastSprint(payload).then(res => {
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
    let students = [];
    if (payload.team[0] !== '') {
        payload.team.forEach(s => {
            studentService.getById(s, payload.token).then(res => {
                students.push(res.data)
                context.commit("SET_TEAM", students)
            });
        })
    }
}
const ADD_MEMBER = (context, payload) => {
    // console.log(payload.id, typeof (payload.id))
    studentService.getById(payload.id, payload.token).then(res => context.commit("ADD_MEMBER", res.data))
}
const SET_QUESTIONS = (context, payload) => {
    questionService.getAll(payload).then(res => context.commit("SET_QUESTIONS", res.data))
}
export default {
    SET_USER, SET_LAST_SPRINT, RESET_STATE, SET_TEAM, ADD_MEMBER, SET_QUESTIONS
}