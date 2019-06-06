
// const PROP1_UPDATED = (state, payload) => {
//     state.someObj.prop1 = payload;
//   };
const getDefaultState = () => {
  return {
    items: [],
    status: 'empty'
  }
}
const SET_USER = (state, payload) => state.user = payload;
const SET_LAST_SPRINT = (state, payload) => state.lastSprint = payload;
const SET_TEAM = (state, payload) => state.team = payload;
const ADD_MEMBER = (state, payload) => {
  if (state.team === undefined) {
    state.team = Array();
    state.team.push(payload);
  }
  else {
    state.team.push(payload);
  }
  return state.team
}
const RESET_STATE = (state) => Object.assign(state, getDefaultState())
export default {
  SET_USER, SET_LAST_SPRINT, RESET_STATE, SET_TEAM, ADD_MEMBER
};