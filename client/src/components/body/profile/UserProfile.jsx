import React from 'react';
import './userprofile.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {

    const auth = useSelector(state => state.auth);
    console.log(auth);
    const { user } = auth;

    return (
        <>
            <div className="user-profile-main-container">
                <div className="user-profile-container container ">
                    <div className="row p-3 m-5 justify-content-center">

                        <div className="user-profile-div col-12 ">

                            <div className="user-profile-heading ">
                                <h3 className="">PROFILE <small><i class="bi bi-person-check"></i></small></h3>
                                <hr />
                            </div>

                            {/* Profile-division  */}
                            <div className="flx-user-info-div">

                                {/* Profile IMG and Name  */}
                                <div className="user-personal-info pt-3">
                                    <div className="user-img">
                                        <img src={user.avatar} className="" alt="" />
                                    </div>
                                    <h6 className="useName mt-4">
                                        {user.name}
                                    </h6>
                                </div>

                                <div className="vertical-line"></div>

                                {/* User Other Information  */}
                                <div className="user-other-info px-5">

                                    <div className="educational-info mb-4  pt-3">
                                        <h5> Educational Information  </h5>
                                        <hr />
                                        <div className="info-div">
                                            <span><b> Institute: </b>{user.institute}</span>
                                            <span><b>  Department: </b>{user.department}</span>
                                        </div>

                                    </div>

                                    <div className="contact-info mb-4 ">
                                        <h5> Contact Information </h5>
                                        <hr />
                                        <div className="info-div">
                                            <span><b> Contact No.: </b><a href={`tel:${user.contact}`}>{user.contact}</a></span> <br />
                                            <span><b> E-mail Id: </b><a href={`mailto:${user.email}`}>{user.email}</a></span>
                                        </div>


                                    </div>

                                    <div className="profile-info mb-4 ">
                                        <h5> Profile Information </h5>
                                        <hr />
                                        <div className="info-div">
                                            {/* <span><b> Github Link: </b>{user.github} </span> */}
                                            <span><b> Github: </b><a href={`${user.github}`} rel="noopener noreferrer" target="_blank">{user.github}</a></span>
                                            <span><b> Linkedin: </b><a href={`${user.linkedIn}`} rel="noopener noreferrer" target="_blank">{user.linkedIn}</a></span>
                                            {/* <span><b> Linkedin: </b>{user.linkedIn}</span> */}
                                        </div>
                                    </div>

                                    <div className="intrest-info mb-4 ">
                                        <h5> Area Of Interest </h5>
                                        <hr />
                                        <div className="info-div">
                                            <span>{user.areaOfInterest}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="profile-update-button">
                                    <button type="submit"><i class="fas fa-user-edit"></i><NavLink to='/profile'>EDIT</NavLink></button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;