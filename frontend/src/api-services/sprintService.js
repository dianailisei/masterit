/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/sprint';

export default {
    getAllByMentor(id, token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/mentor/all/${id}`,
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
    getLastSprint(id, token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/mentor/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    create(sprint, token) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}`, data: sprint, headers: { Authorization: `Bearer ${token}` } });
    },
    update(data, token) {
        return axios({ method: 'put', url: `${RESOURCE_NAME}/`, data, headers: { Authorization: `Bearer ${token}` } })
    },
    delete(id, token) {
        return axios({
            method: 'delete',
            url: `${RESOURCE_NAME}/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};