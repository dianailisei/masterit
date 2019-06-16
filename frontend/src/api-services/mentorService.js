/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/mentor';

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
    login(mentor) {
        return axios({
            method: 'post', url: `${RESOURCE_NAME}/login`, data: mentor
        })
    },
    create(mentor) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}/register`, data: mentor });
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