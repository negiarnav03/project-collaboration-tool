/* 
Name of the Module : Upload Project
Date of Module Creation : 22/10/2021
Author of the module: Jaimin Prajapati 
What the module does : take project details from users
Modification history : 
    In heading svg icon added
    Background Color
*/

import React, { useState } from 'react';
import './uploadproject.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { useHistory } from 'react-router-dom';

const initialState = {
    title: '',
    overview: '',
    description: '',
    requirements: '',
    github: '',
    hiringStatus: '',
    err: '',
    success: ''
}

const UploadProject = () => {

    const token = useSelector(state => state.token);
    const history = useHistory();

    const [data, setData] = useState(initialState);
    const { title, overview, description, requirements, github, hiringStatus, err, success } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/projects/postproject', {
                title, overview, description, requirements, github, hiringStatus: (hiringStatus === "active") ? "0" : "1"
            }, {
                headers: { Authorization: token }
            });

            setData({ ...data, err: '', success: res.data.msg });

            history.push("/");
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' });
        }
    }


    return (
        <>
            <div className="upload-project-main-container">
                <div className="upload-project-container container mt-5 pt-3">
                    <div className="row p-5 mx-5 justify-content-center">
                        <div className="upload-project-div col-12 ">

                            {/* Heading Upload project  */}
                            <div className="heading-div pb-5 ">
                                <h1 className="">UPLOAD &nbsp;PROJECT <i class="bi bi-upload"></i></h1>
                            </div>

                            {/* Input Field | Form Section  */}
                            <div className="details-div">

                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}

                                <form onSubmit={handleSubmit} method="POST">

                                    <div className="input-field">
                                        <label htmlFor="title" className="form-label">TITLE:</label>
                                        <input name="title"
                                            value={title}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Project Title"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="overview" className="form-label">OVERVIEW: </label>
                                        <input name="overview"
                                            value={overview}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Project Overview"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="description" className="form-label">DESCRIPTION:</label>
                                        <textarea name="description"
                                            value={description}
                                            onChange={handleChange}
                                            placeholder="Project Description"
                                            cols="30" rows="5"
                                            className="form-control"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="image" className="form-label">IMAGE:</label>
                                        <input name="image"
                                            accept="image/*"
                                            type="file"
                                            className="form-control"
                                            multiple
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="githubLink" className="form-label">GITHUB LINK:</label>
                                        <input name="github"
                                            value={github}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="requirement" className="form-label">REQUIREMENT:</label>
                                        <input name="requirements"
                                            value={requirements}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="hiringStatus" className="form-label">COLLABORATION STATUS:</label>
                                        <select name="hiringStatus"
                                            value={hiringStatus}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">--Select Status--</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="row justify-content-center">
                                        <button type="submit" className="btn btn-success col-6 button-upload">UPLOAD</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadProject;