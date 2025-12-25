/* 
Name of the Module : Upload Project
Date of Module Creation : 22/10/2021
Author of the module: Jaimin Prajapati 
What the module does : take project details from users
Modification history : 
    In heading svg icon added
    Background Color
*/

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './updateproject.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';

const initialState = {
    requirements: '',
    hiringStatus: '',
    err: '',
    success: ''
}

const UpdateProject = () => {
    const { id } = useParams();
    const [editProject, setEditProject] = useState([]);
    const [checkHiringStatus, setcheckHiringStatus] = useState(false);

    const token = useSelector(state => state.token);
    const projects = useSelector(state => state.projects);
    const history = useHistory();

    const [data, setData] = useState(initialState);
    const {  requirements, hiringStatus, err, success } = data;

    // const [err, setErr] = useState(false);
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (projects.length !== 0) {
            projects.forEach(project => {
                if (project._id === id) {
                    setEditProject(project);
                    setcheckHiringStatus(project.hiringStatus === 0 ? "Active" : "Closed");
                }
            })
        } else {
            history.push(`/myprojects`);
        }
    }, [projects, id, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const handleUpdate = () => {
        try {
            axios.patch(`/projects/updateproject/${editProject._id}`, {
                requirements: requirements ? requirements : editProject.requirements,
                hiringStatus
            }, {
                headers: { Authorization: token }
            });
            setData({ ...data, err: '', success: "Project Updated Successfully :)" });
            // window.location.replace(`/viewproject/${editProject._id}`);
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
                                <h1 className="">UPDATE &nbsp;PROJECT <i className="bi bi-upload"></i></h1>
                            </div>

                            {/* Input Field | Form Section  */}
                            <div className="details-div">

                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}

                                <form method="" onSubmit={handleUpdate}>

                                    <div className="input-field">
                                        <label htmlFor="title" className="form-label">TITLE:</label>
                                        <input name="title"
                                            id="title"
                                            type="text"
                                            placeholder="Project Title"
                                            className="form-control"
                                            defaultValue={editProject.title}
                                            disabled
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="overview" className="form-label">OVERVIEW: </label>
                                        <input name="overview"
                                            id="overview"
                                            defaultValue={editProject.overview}
                                            type="text"
                                            placeholder="Project Overview"
                                            className="form-control"
                                            disabled
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="description" className="form-label">DESCRIPTION:</label>
                                        <textarea name="description"
                                            id="description"
                                            defaultValue={editProject.description}
                                            placeholder="Project Description"
                                            cols="30" rows="5"
                                            className="form-control"
                                            disabled
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="image" className="form-label">IMAGE:</label>
                                        <input name="image"
                                            accept="image/*"
                                            type="file"
                                            className="form-control"
                                            disabled
                                            multiple
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="githubLink" className="form-label">GITHUB LINK:</label>
                                        <input name="github"
                                            id="github"
                                            defaultValue={editProject.github}
                                            type="text"
                                            className="form-control"
                                            disabled
                                            required
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="requirement" className="form-label">REQUIREMENT:</label>
                                        <input name="requirements"
                                            id="requirements"
                                            defaultValue={editProject.requirements}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="hiringStatus" className="form-label">COLLABORATION STATUS:</label>
                                        <select name="hiringStatus"
                                            id="hiringStatus"
                                            defaultValue={checkHiringStatus}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value={editProject.hiringStatus}>{checkHiringStatus}</option>
                                            {
                                                editProject.hiringStatus === 0 ?
                                                    <option value="1">Closed</option>
                                                    :
                                                    <option value="0">Active</option>
                                            }
                                        </select>
                                    </div>

                                    <div className="row justify-content-center">
                                        <button type="submit" className="btn btn-success col-6 button-upload">UPDATE</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProject;