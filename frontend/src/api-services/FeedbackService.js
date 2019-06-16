/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/feedback';

export default {
    getAll(token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    getById(id, token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    getLastFeedback(mentorId, token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/mentor/${mentorId}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    getByMentorId(mentorId, token){
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/mentor/all/${mentorId}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    create(feedback, token) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}`, data: feedback, headers: { Authorization: `Bearer ${token}` } });
    },
    update(id, data, token) {
        return axios({ method: 'put', url: `${RESOURCE_NAME}/${id}`, data, headers: { Authorization: `Bearer ${token}` } })
    },
    delete(id, token) {
        return axios({
            method: 'delete',
            url: `${RESOURCE_NAME}/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};