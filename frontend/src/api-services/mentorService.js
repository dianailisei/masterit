/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/mentor';

export default {
    // getAll() {
    //     return axios.get(RESOURCE_NAME);
    // },
    // getById(id) {
    //     return axios.get(`${RESOURCE_NAME}/${id}`);
    // },
    login(mentor) {
        return axios({
            method: 'post', url: `${RESOURCE_NAME}/login`, data: mentor
        })
    },
    // getByStudentId(id) {
    //     return Mentor.get(`${RESOURCE_NAME}/students/${id}`);
    // },
    create(mentor) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}/register`, data: mentor });
    }
        // update(teacherId, labId, data) { return Mentor.put(`teachers/${teacherId}/Lectures/${labId}`, data); },
        // delete(id) { return Mentor.delete(`${RESOURCE_NAME}/${id}`); }
    };