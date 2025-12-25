import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction';

import './App.css';
import Navbar from './components/header/Navbar';
import Body from './components/body/Body';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // ensures cookies (refresh token) work


function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('http://localhost:5000/user/refresh_token', null);
        dispatch({
          type: 'GET_TOKEN',
          payload: res.data.access_token
        })
      }
      getToken();
    }
  }, [auth.isLogged, dispatch]);

   useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Body />
      </div>
    </Router>
  );
}

export default App;