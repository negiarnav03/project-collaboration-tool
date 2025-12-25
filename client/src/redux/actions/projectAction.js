import ACTIONS from './index';
import axios from 'axios';

export const fetchAllProjects = async (token) => {
    const res = await axios.get('/projects', {
        headers: { Authorization: token }
    });

    return res;
}

export const fetchParticularProjects = async (token) => {
    const res = await axios.get('/profile/getprojects', {
        headers: { Authorization: token }
    });
    return res;
}

export const dispatchGetAllProjects = (res) => {
    return {
        type: ACTIONS.GET_ALL_PROJECTS,
        payload: res.data
    }
}

export const dispatchGetParticularProjects = (res) => {
    return {
        type: ACTIONS.GET_PARTICULAR_PROJECTS,
        payload: res.data
    }
}