/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/course';

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
    
    create(course, token) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}`, data: course, headers: { Authorization: `Bearer ${token}` } });
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