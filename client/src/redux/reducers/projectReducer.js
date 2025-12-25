import ACTIONS from '../actions/';

const projects = [];

const projectReducer = (state = projects, action) => {
    switch (action.type) {

        case ACTIONS.GET_ALL_PROJECTS:
            return action.payload;

        case ACTIONS.GET_PARTICULAR_PROJECTS:
            return action.payload;

        default:
            return state;
    }
}

export default projectReducer;