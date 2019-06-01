/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/student';

export default {
    // getAll() {
    //     return axios.get(RESOURCE_NAME);
    // },
    // getById(id) {
    //     return axios.get(`${RESOURCE_NAME}/${id}`);
    // },
    login(student) {
        return axios({
            method: 'post', url: `${RESOURCE_NAME}/login`, data: student
        })
    },
    // getByStudentId(id) {
    //     return Mentor.get(`${RESOURCE_NAME}/students/${id}`);
    // },
    create(student) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}/register`, data: student });
    }
    // update(teacherId, labId, data) { return Mentor.put(`teachers/${teacherId}/Lectures/${labId}`, data); },
    // delete(id) { return Mentor.delete(`${RESOURCE_NAME}/${id}`); }
};