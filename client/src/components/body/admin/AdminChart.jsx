import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification';
import axios from 'axios';
import './adminchart.css'

const initialState = {
    totalUsers: '',
    totalProjects: '',
    hiringProjects: '',
    requests: '',
    err: '',
    success: ''
}

const AdminChart = () => {

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const users = useSelector(state => state.users);
    const [admin, setAdmin] = useState([]);

    const { user, isAdmin } = auth;

    const [data, setData] = useState(initialState);
    const { totalUsers, totalProjects, hiringProjects, requests, err, success } = data;

    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            const res = axios.get('/admin', {
                headers: { Authorization: token }
            });
            var promise = Promise.resolve(res);

            promise.then(function (val) {
                setAdmin(val.data);
            });
        }
    });


    return (
        <>
            <div class="box-1">
                <div class="content-box-1">
                    <p class="head-1">
                        Total Registered User
                    </p>

                    <div class="circle-wrap">
                        <div class="circle">
                            <div class="mask full">
                                <div class="fill"></div>
                            </div>
                            <div class="mask half">
                                <div class="fill"></div>
                            </div>
                            <div class="inside-circle"> {admin.totalUsers} </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-1">
                <div class="content-box-1">
                    <p class="head-1">
                        Total Posted Projects
                    </p>

                    <div class="circle-wrap">
                        <div class="circle">
                            <div class="mask full">
                                <div class="fill"></div>
                            </div>
                            <div class="mask half">
                                <div class="fill"></div>
                            </div>
                            <div class="inside-circle"> {admin.totalProjects} </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-1">
                <div class="content-box-1">
                    <p class="head-1">
                        Currently Hiring Projects
                    </p>

                    <div class="circle-wrap">
                        <div class="circle">
                            <div class="mask full">
                                <div class="fill"></div>
                            </div>
                            <div class="mask half">
                                <div class="fill"></div>
                            </div>
                            <div class="inside-circle"> {admin.hiringProjects} </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminChart;