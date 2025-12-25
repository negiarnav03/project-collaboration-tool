/* 
Name of the Module : Full Project Profile
Date of Module Creation : 23/09/2021
Author of the module: Jaimin Prajapati
What the module does : Display Full Information of project and Project Owner
Modification history : 
    Box-shadow remove in Project Details(Division 3)
*/

import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './viewproject.css';
import img from '../projects/default_image.png';
import ProjectImgCarousel from '../projects/ProjectImgCarousel';
import Footer from '../home/Footer';

const ViewProject = () => {
  const { id } = useParams();
  const history = useHistory();
  const [editProject, setEditProject] = useState([]);
  const [profile, setProfile] = useState([]);
  const [checkHiringStatus, setcheckHiringStatus] = useState(false);
  const [members, setMembers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('Leader');
  const [addMemberMsg, setAddMemberMsg] = useState('');

  const projects = useSelector(state => state.projects);

  useEffect(() => {
    if (projects.length !== 0) {
      projects.forEach(project => {
        if (project._id === id) {
          axios.get(`/projects/${id}`).then((val) => setProfile(val.data));
          setEditProject(project);
          setcheckHiringStatus(project.hiringStatus === 0 ? 'Active' : 'Closed');
          setMembers(Array.isArray(project.members) ? project.members : []);
        }
      });
    } else {
      history.push(`/myprojects`);
    }
  }, [projects, id, history]);

  // Add Member handler
  const handleAddMember = async (e) => {
    e.preventDefault();
    setAddMemberMsg('');
    if (!memberEmail || !memberRole) {
      setAddMemberMsg('Enter email and select role.');
      return;
    }
    try {
      const res = await axios.post(`/projects/${id}/add-member`, {
        email: memberEmail,
        role: memberRole,
      });
      setAddMemberMsg(res.data.msg || 'Member added!');
      if (Array.isArray(res.data.members)) setMembers(res.data.members);
      setMemberEmail('');
      setMemberRole('Leader');
    } catch (err) {
      setAddMemberMsg(
        err.response?.data?.msg || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <>
      <div className="grd-joinProjectContainer mt-5">
        <div className="flx-projectContent">
          {/* Project Title */}
          <div className="project-title">
            <h2>{editProject.title}</h2>
            <hr />
          </div>

          {/* About Members Section */}
          <div className="members-section">
            <h4>Project Members</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {members.map((m, idx) => (
                <li key={m.email+idx} style={{ margin: '0.2em 0' }}>
                  <b>{m.email}</b> — <span className="member-role">{m.role}</span>
                </li>
              ))}
              {members.length === 0 && <li>No members added yet.</li>}
            </ul>
            {/* Add Member Button and Form */}
            {!showAddMember ? (
              <button className="request-button mt-2" onClick={() => setShowAddMember(true)}>+ Add Member</button>
            ) : (
              <form onSubmit={handleAddMember} className="add-member-form mt-2" style={{display:'flex',flexDirection:'row',gap:'6px',flexWrap:'wrap',alignItems:'center'}}>
                <input
                  type="email"
                  placeholder="Member Email"
                  required
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  style={{padding:'4px 7px',fontSize: '1em',borderRadius:'6px',border:'1.3px solid #8BD8A1'}}
                />
                <select
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value)}
                  style={{padding:'4px 7px',fontSize: '1em',borderRadius:'6px',border:'1.3px solid #8BD8A1',color:'#214467'}}>
                  <option value="Leader">Leader</option>
                  <option value="Team Member">Team Member</option>
                </select>
                <button type="submit" className="request-button">Add</button>
                <button type="button" className="request-button" style={{background:'#eee',borderColor:'#bebebe',color:'#777'}} onClick={()=>{setShowAddMember(false);setAddMemberMsg('')}}>Cancel</button>
                {addMemberMsg && <span style={{marginLeft:'1.2em',fontSize:'1em',color: addMemberMsg.startsWith('Member added')? 'green':'crimson'}}>{addMemberMsg}</span>}
              </form>
            )}
          </div>

          {/* division2: Project Info and Image */}
          <div className="flx-projectDiv2">
            <div className="projectOverview">
              <h5>Overview:</h5> <br />
              {editProject.overview}
            </div>
            <div className="project-image">
              <ProjectImgCarousel />
            </div>
          </div>

          {/* division3: Project Details */}
          <div className="project-details mt-5">
            <div className="project-description">
              <h5>Description:</h5>
              <br />
              {editProject.description}
            </div>
            <div className="project-requirement">
              <h5>Requirements:</h5>
              <br />
              {editProject.requirements}
            </div>
          </div>

          {/* division4: Bottom Buttons */}
          <div className="flx-project-bottom">
            <div className="GithubLink-div">
              <b> Github Link: </b>
              <a href={`${editProject.github}`} rel="noopener noreferrer" target="_blank">{editProject.github}</a>
            </div>
            <div className="Collabration-status">
              <b>Collabration-status: </b>
              {checkHiringStatus}
            </div>
            <div className="request-button-div">
              <Link to={`/updateproject/${editProject._id}`}>
                <button className="request-button">
                  <span>EDIT</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" /></svg>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
      {/* Footer? Add as needed */}
    </>
  );
};

export default ViewProject;