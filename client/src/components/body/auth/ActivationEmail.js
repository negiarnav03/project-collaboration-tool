/* 
Name of the module: Email Verification

Date of module Creation: 02/10/2021

Author of the module: Mohit Prajapati

What the module does: activates the account

Functions supported:
1. ActivationEmail   => Input: activation_token;              Output: Success/err
*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activate', { activation_token });
                    setSuccess(res.data.msg);
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg);
                }
            }
            activationEmail();
        }
    }, { activation_token });

    return (
        <div className="active_page">
            {err & showErrMsg(err)}
            {success & showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail;