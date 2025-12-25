/* 
Name of the module: Login

Date of module Creation: 02/10/2021

Author of the module: Mohit Prajapati

What the module does: Login user

Functions supported:
1. Login   => Input: email, password;              Output: Success/err
*/

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './Input';
import Captcha from './Captcha';

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showPassword, setShowPassword] = useState(false);

    // Show Password
    // const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    // authentication
    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // if (num === 1) {
            // setShowPassword(false);
            const res = await axios.post('/user/login', { email, password });
            const user = await axios.get(`/user/getuser/${email}`);
            var promise = Promise.resolve(user);

            setUser({ ...user, err: '', success: res.data.msg });

            localStorage.setItem('firstLogin', true);

            dispatch(dispatchLogin());
            
            promise.then(function (val) {
                if (val.data.user.flag === 0) {
                    history.push('/profile');
                } else {
                    history.push('/');
                }
            });
            // } else {
            //     setUser({ ...user, err: 'Please verify captcha', success: '' });
            // }
        }catch (err) {
            const errorMsg = err.response?.data?.msg || "Something went wrong. Please try again later.";
            setUser({ ...user, err: errorMsg, success: '' });
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/googleLogin', { tokenId: response.tokenId });

            setUser({ ...user, error: '', success: res.data.msg });
            localStorage.setItem('firstLogin', true);

            dispatch(dispatchLogin());
            history.push('/');
        } catch (err) {
            const errorMsg = err.response?.data?.msg || "Something went wrong. Please try again later.";
            setUser({ ...user, err: errorMsg, success: '' });
        }
    }

    return (
        <div className="login_main mt-3 p-3 row">
            <div className="login_page my-5 pt-5 pb-4 px-5 col-6">
                <h2>Login</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter email address*" id="email" value={email} name="email" onChange={handleChangeInput} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        {/* <Input 
                            label="Enter password"
                            id="password"
                            value={password}
                            name="password"
                            type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}
                            onChange={handleChangeInput} /> */}
                        <input type="password" placeholder="Enter password*" id="password" value={password} name="password" onChange={handleChangeInput} />
                    </div>

                    {/* <Captcha /> */}

                    <div className="login_row p-3">
                        <button type="submit" className="m-3">Login</button>
                        <Link to="/forgotpassword" className="m-3">Forgot Password?</Link>
                    </div>
                </form>

                <div className="social">
                    <GoogleLogin
                        clientId="847420158761-92uljklrgb915jmrosc3hrrcfoq2tml7.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                <p>Don't have an acoount?<Link to="/register"> Click here </Link></p>
            </div>
        </div>
    );
}

export default Login;