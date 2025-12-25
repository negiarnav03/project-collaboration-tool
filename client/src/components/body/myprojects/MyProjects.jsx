/* 
Name of the Module : Projects
Date of Module Creation : 2/10/2021
Author of the module: Jaimin Prajapati
What the module does : show all uploaded projects
Modification history : 
    Card-Bottom Button and Like Button Effect
*/

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParticularProjects, dispatchGetParticularProjects } from '../../../redux/actions/projectAction';
import { NavLink } from 'react-router-dom';
import './myProjects.css';
import ProjectImgCarousel from './ProjectImgCarousel';
import Footer from '../home/Footer';
import axios from 'axios';

const MyProjects = () => {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const projects = useSelector(state => state.projects);
    const { isAdmin } = auth;
    const [callback] = useState(false);
    const dispatch = useDispatch();

    // Track show/hide form and form state for each project
    const [showAddForm, setShowAddForm] = useState({});
    const [memberForm, setMemberForm] = useState({}); // keyed by projectId
    const [addMsg, setAddMsg] = useState({});

    useEffect(() => {
        fetchParticularProjects(token).then(res => {
            dispatch(dispatchGetParticularProjects(res));
        })
    }, [token, isAdmin, dispatch, callback]);

    const handleAddMemberBtn = (projectId) => {
        setShowAddForm(f => ({ ...f, [projectId]: true }));
        setAddMsg(am => ({ ...am, [projectId]: '' }));
    };
    const handleCancel = (projectId) => {
        setShowAddForm(f => ({ ...f, [projectId]: false }));
        setAddMsg(am => ({ ...am, [projectId]: '' }));
        setMemberForm(mf => ({ ...mf, [projectId]: { email:'', role:'Leader' } }));
    };
    const handleInputChange = (projectId, field, value) => {
        setMemberForm(mf => ({ ...mf, [projectId]: { ...mf[projectId], [field]: value }}));
    };
    const handleSubmit = async (e, projectId) => {
       // e.preventDefault();
        const form = memberForm[projectId] || { email:'', role:'Leader' };
        if (!form.email || !form.role) {
            setAddMsg(am => ({ ...am, [projectId]: 'Enter email & select role.' }));
            return;
        }
        try {
            const res = await axios.post(`/projects/${projectId}/add-member`, {
                email: form.email,
                role: form.role,
            });
            setAddMsg(am => ({ ...am, [projectId]: res.data.msg || 'Added!' }));
            setMemberForm(mf => ({ ...mf, [projectId]: { email:'', role:'Leader' } }));
        } catch (err) {
            setAddMsg(am => ({ ...am, [projectId]: err.response?.data?.msg || 'Something went wrong.' }));
        }
    };

    return (
        <>
            <div className="grd-myprojects mt-5 p-5">
                {projects.map(project => (
                    <div className="myCard" key={project._id}>
                        {/* Project Images */}
                        <div className="img-div">
                            <ProjectImgCarousel className="myproject-img" />
                        </div>
                        {/* Project detail/overview */}
                        <div className="project-detail">
                            <span><b>{project.title}</b></span>
                            <br /><br />
                            <p>{project.overview}</p>
                            {/* Add Member UI (always visible inside card) */}
                            <div style={{marginTop:'8px', textAlign:'center'}}>
                                {!showAddForm[project._id] ? (
                                    <button className="request-button" style={{marginBottom:'6px'}} onClick={() => handleAddMemberBtn(project._id)}>+ Add Member</button>
                                ) : (
                                    <form style={{display:'flex',flexDirection:'row',gap:'4px',alignItems:'center',flexWrap:'wrap'}} onSubmit={e=>handleSubmit(e, project._id)}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={memberForm[project._id]?.email || ''}
                                            required
                                            style={{padding:'3px 7px',fontSize:'1em',borderRadius:'6px',border:'1.2px solid #79deb5'}}
                                            onChange={e=>handleInputChange(project._id,'email',e.target.value)}
                                        />
                                        <select
                                            value={memberForm[project._id]?.role || 'Leader'}
                                            style={{padding:'3px 7px',fontSize:'1em',borderRadius:'6px',border:'1.2px solid #79deb5'}}
                                            onChange={e=>handleInputChange(project._id,'role',e.target.value)}
                                        >
                                            <option value="" disabled selected >Select Role</option>
                                            <option value="Leader">Leader</option>
                                            <option value="Team Member">Team Member</option>
                                        </select>
                                        <button type="submit" className="request-button">Add</button>
                                        <button type="button" className="request-button" style={{background:'#eee',borderColor:'#bebebe',color:'#777'}} onClick={()=>handleCancel(project._id)}>Cancel</button>
                                        {addMsg[project._id] && <span style={{marginLeft:'0.7em',fontSize:'1em',color: addMsg[project._id].startsWith('Member added') ? 'green' : 'crimson'}}>{addMsg[project._id]}</span>}
                                    </form>
                                )}
                            </div>
                            {/* Project Card Bottom Division Like and Read More */}
                            <div className="flx-mycard-bottom">
                                <NavLink exact to={`/viewproject/${project._id}`}>
                                    <button className="button button-readmore"> <b> Read More </b></button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Using Footer Module on Home Page */}
            {/* <Footer /> */}
        </>
    );
};

export default MyProjects;