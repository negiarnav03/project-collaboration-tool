import React from "react";
import "./aboutus.css";
// import vdo from '../VIDEO/tractor-driving.mp4'

const About = () => {
  return (
    <>
      <div className="about-main-container">
        <div className="about-main  m-3 p-5">
          <div className="about-heading p-2">
            <h2>About This Website</h2>
          </div>

          <div className="about-container p-3 m-3">
            <div className="about-description p-2">
              <p>
                This Project Collaboration Tool is designed to streamline teamwork, allowing users to easily join, manage, and contribute to collaborative projects. With features such as secure authentication, personalized profiles, and intuitive project management, the platform encourages effective communication and enhanced productivity among team members. The website supports role-based functionality for various participants and provides a centralized space for sharing updates, tracking progress, and achieving project goals together efficiently.
              </p>
            </div>
          </div>

          <div className="developer-div p-3">
            <h2 className="mb-5 ps-3">DEVELOPERs</h2>

            <div className="dev-name p-3">
              <h4 className="names">2210990163 <br /> Arnav Negi</h4>
              <h4 className="names">2210990149 <br /> Arayana Singh</h4>
              <h4 className="names">2210990164 <br /> Arpit Garg</h4>
              <h4 className="names">2210990122 <br /> Anmol Grover</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
