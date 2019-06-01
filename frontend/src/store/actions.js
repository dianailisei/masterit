// const action1 = (context) => {
//     ...
//     context.commit('MUTATION', payload);
// };
const SET_USER = (context, payload) => {
    context.commit("SET_USER", payload);
}
export default {
    SET_USER
}