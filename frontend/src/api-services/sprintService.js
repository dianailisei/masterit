/* eslint-disable no-undef */

const RESOURCE_NAME = '/api/v1/sprint';

export default {
    getAllByMentor(token) {
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
    getLastSprint(token) {
        return axios({
            method: 'get',
            url: `${RESOURCE_NAME}/last`,
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    create(sprint, token) {
        return axios({ method: 'post', url: `${RESOURCE_NAME}`, data: sprint, headers: { Authorization: `Bearer ${token}` } });
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