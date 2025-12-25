/*
Name of the module: Request to join project

Date of module Creation: 26/10/2021

Author of the module: Mohit Prajapati

What the module does: Mails the collaboration request to project creator

Functions supported:
1. joinProject => Input: id, profile fields; Output: "Request Sent Successfully!"

Global variables: user id, project id
*/

const Request = require('../models/requestModel');
const Projects = require('../models/projectModel');
const Users = require('../models/userModel');
const requestsendMail = require('./requestSendMail');

const requestCtrl = {
    // request for joining project
    joinProject: async (req, res) => {
        try {
            const collaboratorID = req.user.id;
            const projectID = req.params.id;

            const profileChecker = await Users.findById({ _id: collaboratorID });
            if (profileChecker.flag === 0)
                return res.status(400).json({ msg: 'Please create your profile first' });

            const projectData = await Projects.findOne({ _id: projectID }).exec();

            if (!projectData)
                return res.status(404).json({ msg: `No post with id: ${projectID}` });

            if (projectData.hiringStatus)
                return res.status(400).json({ msg: `Collaboration for ${projectData.title} is closed` });

            const check = await Request.findOne({ projectID, collaboratorID }).exec();

            if (check) {
                if (check.requestStatus == 1)
                    res.json({ msg: "You have alredy sent a request to collaborate with this project." });
            } else {
                const creator = projectData.creator;
                const user = await Users.findOne({ _id: creator }).exec();
                const requester = await Users.findOne({ _id: collaboratorID }).exec();
                const email = user.email, name = requester.name, requesterEmail = requester.email, title = projectData.title;

                if (creator == collaboratorID) return res.json({ msg: `Request failed! You are the project owner of ${title}.` });

                const newRequest = new Request({
                    projectID, collaboratorID, requestStatus: 1
                });

                await newRequest.save();

                requestsendMail(email, "Congratulations! You have received a new collaboration request.", `FROM: ${name} (${requesterEmail})`, `PROJECT: ${title}`, "Thank You!");

                res.json({ msg: "Request sent successfully" });
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = requestCtrl;