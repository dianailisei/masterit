/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/student';

export default {
    getAll(token) {
        return axios({method: 'get', url: `${RESOURCE_NAME}/all`, headers: { Authorization: `Bearer ${token}` }})
    },
    getById(id, token) {
        return axios({method: 'get', url: `${RESOURCE_NAME}/${id}`, headers: { Authorization: `Bearer ${token}` }})
    },
    login(student) {
        return axios({
            method: 'post', url: `${RESOURCE_NAME}/login`, data: student
        })
    },
    create(student) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}/register`, data: student });
    },
    update(data, token) {
        return axios({ method: 'put', url: `${RESOURCE_NAME}/update`, data, headers: { Authorization: `Bearer ${token}` } })
    },
    delete(token) {
        return axios({
            method: 'delete',
            url: `${RESOURCE_NAME}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};