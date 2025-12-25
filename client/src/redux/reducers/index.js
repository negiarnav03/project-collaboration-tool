import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import projects from './projectReducer';
import requests from './adminReducer';

export default combineReducers({
    auth,
    token,
    projects,
    requests
});