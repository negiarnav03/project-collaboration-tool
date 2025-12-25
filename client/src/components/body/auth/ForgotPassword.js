/* 
Name of the module: Forgot Password

Date of module Creation: 02/10/2021

Author of the module: Mohit Prajapati

What the module does: Forgot account

Functions supported:
1. ForgotPassword   => Input: email;              Output: Success/err

Global variables: user id
*/

import React, { useState } from 'react';
import axios from 'axios';
import { isEmail } from '../../utils/validation/Validation';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState);

    const { email, err, success } = data;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const forgotPassword = async () => {
        if (!isEmail(email))
            return setData({ ...data, err: 'Please enter valid email!', success: '' });

        try {
            const res = await axios.post('/user/forgotpassword', { email });

            return setData({ ...data, err: '', success: res.data.msg });
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' });
        }
    }

    return (
        <div className="fg_pass mt-5 p-5">
            <h2>Forgot Your Password?</h2>

            <div className="fg_row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email}
                    onChange={handleChangeInput} />
                <button onClick={forgotPassword}>Submit</button>
            </div>
        </div>
    );
}

export default ForgotPassword;
