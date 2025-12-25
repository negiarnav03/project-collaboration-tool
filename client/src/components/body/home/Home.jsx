/* 
Name of the Module : Home Page 
Date of Module Creation : 14/08/2021
Author of the module: Jaimin Prajapati
What the module does : System home page UI create
Modification history : 
    Change Button effect
    Place department and footer Section
*/
import React from 'react'
import { NavLink } from 'react-router-dom';
import './home.css';
import homeImg from './homesvg.svg'
import Department from './Department';
import Footer from './Footer';

const Home_main = () => {
    return (
        <>
            <div className="home_main">
                <section className="mt-5">
                    <div className="flx-home" id="home-div">
                        <div className="flx-leftSide ms-5 mt-5 pt-5">

                            {/* HOME page Text area */}
                            <h2 className="mt-5">
                                Express Your knowledge with
                                <br />
                                <strong className="brand-name"> Project Collaboration Tool </strong>
                            </h2>
                            <h5 className="mt-3">
                                Here is developers of creative MIND
                            </h5>


                            {/* HOME page Upload and Join Button */}
                            <div className="btn-view mt-5">

                                <NavLink exact to="/projects/postproject" className="btn-homePage me-4 m-2">
                                    UPLOAD PROJECT
                                </NavLink>
                                <NavLink exact to="/projects" className="btn-homePage ms-2 m-2">
                                    JOIN PROJECT
                                </NavLink>

                            </div>

                        </div>

                        {/* HOME Page Main Image */}

                        <div className="rightSide mt-5">
                            <img src={homeImg} alt="Home IMG" className="home-Img" />
                        </div>

                    </div>
                </section>

                {/* Home page Maintain Space  */}
                <div className="mt-5 pt-3">
                    <hr />
                </div>

                {/* Using Deparment Module on Home Page */}
                <Department />

                {/* Using Footer Module on Home Page */}
                <Footer />
            </div>
        </>
    )
}

export default Home_main;