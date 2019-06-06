/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/question';

export default {
    getAll(token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/all`,
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

    getByCourseId(id, token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/course/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    create(question, token) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}`, data: question, headers: { Authorization: `Bearer ${token}` } });
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
    },
    deleteByCourseId(id, token) {
        return axios({
            method: 'delete',
            url: `${RESOURCE_NAME}/course/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};