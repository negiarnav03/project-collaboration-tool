/*
Name of the module: Admin Section

Date of module Creation: 31/10/2021

Author of the module: Mohit Prajapati

What the module does: Fetches all collaboration requests, total users registered, total projects posted, currently hiring projects

Functions supported:
1. getAllDetails  => Input: id;       Output: result;

Global variables: user id
*/

const Projects = require('../models/projectModel');
const Users = require('../models/userModel');
const Request = require('../models/requestModel');

const adminCtrl = {
    // fetch details that are to be displayed on admin panel
    getAllDetails: async (req, res) => {
        try {
            const id = req.user.id;
            const admin = await Users.findById({ _id: id });

            if (admin.role === 1) {
                const totalUsers = await Users.count();
                const totalProjects = await Projects.count();
                const hiringProjects = await Projects.count({ "hiringStatus": "0" });
                const requests = await Request.find().populate(['projectID', 'collaboratorID']).exec();

                const result = {
                    totalUsers: totalUsers,
                    totalProjects: totalProjects,
                    hiringProjects: hiringProjects,
                    requests: requests
                }
                // console.log(result.requests._id);
                res.json(result);
            } else {
                res.json({ msg: "Access Denied" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getAllRequests: async (req, res) => {
        try {
            const id = req.user.id;
            const admin = await Users.findById({ _id: id });

            if (admin.role === 1) {
                const requests = await Request.find().populate(['projectID', 'collaboratorID']).exec();

                res.json(requests);
            } else {
                res.json({ msg: "Access Denied" });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = adminCtrl;