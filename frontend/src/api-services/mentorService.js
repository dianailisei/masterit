/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/mentor';

export default {
    getAll() {
        return Mentor.get(RESOURCE_NAME);
    },
    getById(id) {
        return Mentor.get(`${RESOURCE_NAME}/${id}`);
    }
    // getByStudentId(id) {
    //     return Mentor.get(`${RESOURCE_NAME}/students/${id}`);
    // },
    // create(teacherId, subjectId, data) { return Mentor.post(`subjects/${subjectId}/teachers/${teacherId}/Lectures`, data); },
    // update(teacherId, labId, data) { return Mentor.put(`teachers/${teacherId}/Lectures/${labId}`, data); },
    // delete(id) { return Mentor.delete(`${RESOURCE_NAME}/${id}`); }
};