/*
Name of the module: Project Section

Date of module Creation: 08/10/2021

Author of the module: Mohit Prajapati

What the module does: CRUD of projects, get all projects

Functions supported:
1. postProject   => Input: id, project fields;              Output: "Project has been uploaded successfully!"
2. getProjects   => Input: -;                               Output: User data
3. getProject    => Input: projectID;                       Output: Particular project will be displayed
4. updateProject => Input: projectID, fields to be updated; Output: "Project has been updated successfully!"
5. deleteProject => Input: projectID;                       Output: "Project deleted successfully!"
6. likeProject   => Input: projectID;                       Output: like count incremented by 1.

Global variables: user id, project id
*/

const Projects = require('../models/projectModel');
const Profile = require('../models/profileModel');
const Users = require('../models/userModel');

const projectCtrl = {
    // post project
    postProject: async (req, res) => {
        try {
            const { title, overview, description, requirements, github, hiringStatus, likes } = req.body;

            const newProject = new Projects({
                creator: req.user.id,
                title,
                overview,
                description,
                requirements,
                github,
                hiringStatus,
                likes
            });

            await newProject.save();

            res.json({ msg: "Project has been uploaded successfully!" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get all projects
    getProjects: async (req, res) => {
        try {
            const projects = await Projects.find();

            res.status(200).json(projects);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get single project owner profile
    getProject: async (req, res) => {
        try {
            const id = req.params.id;
            const project = await Projects.findById(id);
            const owner = await Profile.findOne({ creator: project.creator });
            const user = await Users.findOne({ _id: project.creator });

            const result = {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                institute: owner.institute,
                department: owner.department,
                github: owner.github,
                linkedIn: owner.linkedIn,
                areaOfInterest: owner.areaOfInterest,
                contact: owner.contact
            };

            res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // update project
    updateProject: async (req, res) => {
        try {
            const id = req.params.id;
            const { requirements, hiringStatus } = req.body;

            if (!requirements && !hiringStatus)
                return res.status(400).json({ msg: "You are allowed to update only requirements and hiring status!" });

            const projectData = await Projects.findOne({ _id: id }).exec();

            if (!projectData) return res.status(404).json({ msg: `No post with id: ${id}` });

            const currentUserID = req.user.id;

            if (currentUserID == projectData.creator) {
                await Projects.findOneAndUpdate({ _id: id }, {
                    requirements,
                    hiringStatus
                });

                res.json({ msg: "Project updated successfully!" });
            } else {
                res.json({ msg: "Invalid Authentication!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // delete prooject
    deleteProject: async (req, res) => {
        const id = req.params.id;
        const projectData = await Projects.findOne({ _id: id }).exec();

        if (!projectData) return res.status(404).json({ msg: `No post with id: ${id}` });

        const currentUserID = req.user.id;

        if (currentUserID === projectData.creator) {
            await Projects.findByIdAndRemove(id);

            res.json({ msg: "Project deleted successfully!" });
        } else {
            return res.status(500).json({ msg: err.message });
        }
    },

    // like project
    likeProject: async (req, res) => {
        try {
            const id = req.params.id;

            const projectData = await Projects.findOne({ _id: id }).exec();

            if (!projectData) return res.status(404).json({ msg: `No post with id: ${id}` });

            if (req.user.id) {
                const index = post.likes.findIndex((id) => id === String(req.userId));

                // await Projects.findOneAndUpdate({ _id: id }, { likes: projectData.likes + 1 });
                if (index === -1) {
                    projectData.likes.push(req.userId);
                } else {
                    projectData.likes = projectData.likes.filter((id) => id !== String(req.user.id));
                }

                await Projects.findByIdAndUpdate(id, projectData, { new: true });

                res.json({ msg: "Project liked successfully!" });
            } else {
                res.json({ msg: "Invalid Authentication!" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // add member
    addMember: async (req, res) => {
        try {
            const projectId = req.params.id;
            const { email, role } = req.body;
            if (!email || !role) return res.status(400).json({ msg: 'Provide member email and role.' });
            const project = await Projects.findById(projectId);
            if (!project) return res.status(404).json({ msg: 'Project not found.' });
            // Do not add duplicate emails (optionally, allow different role updates)
            const alreadyMember = project.members.find(m => m.email.toLowerCase() === email.toLowerCase());
            if (alreadyMember) return res.status(400).json({ msg: 'Member already added.' });
            project.members.push({ email, role });
            await project.save();
            res.json({ msg: 'Member added successfully!', members: project.members });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = projectCtrl;