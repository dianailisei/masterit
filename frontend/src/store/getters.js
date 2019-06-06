const user = state => state.user;
const lastSprint = state => state.lastSprint;
const team = state => state.team;
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
    return diffDays;
}
export default {
    user,
    lastSprint,
    getSprintRemainingDays,
    team
};