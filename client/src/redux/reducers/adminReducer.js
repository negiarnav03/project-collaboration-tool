import ACTIONS from '../actions/';

const requests = [];

const adminReducer = (state = requests, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_DETAILS:
            console.log(requests)
            return action.payload
        default:
            return state
    }
}

export default adminReducer;