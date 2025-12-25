import ACTIONS from './index'
import axios from 'axios'

export const fetchAllDetails = async (token) => {
    const res = await axios.get('/admin/requests', {
        headers: { Authorization: token }
    })
    return res
}

export const dispatchGetAllDetails = (res) => {
    return {
        type: ACTIONS.GET_ALL_DETAILS,
        payload: res.data
    }
}