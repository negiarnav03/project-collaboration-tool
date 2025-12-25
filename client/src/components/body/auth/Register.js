/* 
Name of the module: Register user

Date of module Creation: 02/10/2021

Author of the module: Mohit Prajapati

What the module does: creates new account

Functions supported:
1. Login   => Input: name, email, password;              Output: Success/err
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { isEmpty, isEmail, isLength, isMatch } from '../../utils/validation/Validation';
import Input from './Input';
import Captcha from './Captcha';

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const { name, email, password, cf_password, err, success } = user;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(name) || isEmpty(password))
            return setUser({ ...user, err: "Please fill in all fields.", success: '' });

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid email.", success: '' });

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 8 characters.", success: '' });

        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Passwords did not match.", success: '' });
        try {

            const res = await axios.post('/user/register', {
                name, email, password
            });

            setUser({ ...user, err: '', success: res.data.msg });

        } catch (err) {
            const errorMsg = err.response?.data?.msg || "Something went wrong. Please try again later.";
            setUser({ ...user, err: errorMsg, success: '' });
        }
    }

    return (
        <div className="login_main mt-5 pb-5 row">
            <div className="login_page mt-4 py-3 px-5 col-6">
                <h2>Register</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter your name" id="name"
                            value={name} name="name" onChange={handleChangeInput} />
                    </div>

                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="text" placeholder="Enter email address" id="email"
                            value={email} name="email" onChange={handleChangeInput} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        {/* <Input type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} placeholder="Enter password" id="password"
                            value={password} name="password" onChange={handleChangeInput} /> */}
                        <input type="password" placeholder="Enter password" id="password"
                            value={password} name="password" onChange={handleChangeInput} />
                    </div>

                    <div>
                        <label htmlFor="cf_password">Confirm Password</label>
                        <input type="password" placeholder="Confirm password" id="cf_password"
                            value={cf_password} name="cf_password" onChange={handleChangeInput} />
                    </div>

                    {/* <Captcha /> */}

                    <div className="login_row m-2">
                        <button type="submit">Register</button>
                    </div>
                </form>

                <p>Already an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;