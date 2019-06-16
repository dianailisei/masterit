/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/student';

export default {
    getAll(token) {
        return axios({method: 'get', url: `${RESOURCE_NAME}`, headers: { Authorization: `Bearer ${token}` }})
    },
    getById(id, token) {
        return axios({method: 'get', url: `${RESOURCE_NAME}/${id}`, headers: { Authorization: `Bearer ${token}` }})
    },
    getByMentor(id, token) {
        return axios({method: 'get', url: `${RESOURCE_NAME}/mentor/${id}`, headers: { Authorization: `Bearer ${token}` }})
    },
    login(student) {
        return axios({
            method: 'post', url: `${RESOURCE_NAME}/login`, data: student
        })
    },
    create(student) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}/register`, data: student });
    },
    update(id, data, token) {
        return axios({ method: 'put', url: `${RESOURCE_NAME}/${id}`, data, headers: { Authorization: `Bearer ${token}` } })
    },
    delete(id,token) {
        return axios({
            method: 'delete',
            url: `${RESOURCE_NAME}/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};