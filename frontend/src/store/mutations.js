
// const PROP1_UPDATED = (state, payload) => {
//     state.someObj.prop1 = payload;
//   };
// const getDefaultState = () => {
//   return {
//     items: [],
//     status: 'empty'
//   }
// }
const SET_USER = (state, payload) => state.user = payload;
const SET_LAST_SPRINT = (state, payload) => state.lastSprint = payload;
const SET_TEAM = (state, payload) => state.team = payload;
const SET_QUESTIONS = (state, payload) => state.questions = payload;
const SET_GOOD_PRACTICES = (state, payload) => state.goodPractices = payload;
const SET_LAST_FEEDBACK = (state, payload) => state.lastFeedbackTest = payload;
const SET_FEEDBACK_TESTS = (state, payload) => state.feedbackTests = payload;
const RESET_STATE = (state) => {
  state.user = {};
  state.team = [];
  state.lastSprint= {};
  state.questions= [];
  state.goodPractices= [];
  state.lastFeedbackTest = {};
  state.feedbackTests = [];
}
export default {
  SET_USER, SET_LAST_SPRINT, RESET_STATE, SET_TEAM, SET_QUESTIONS, SET_GOOD_PRACTICES,
  SET_LAST_FEEDBACK, SET_FEEDBACK_TESTS
};