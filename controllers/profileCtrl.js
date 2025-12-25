/*
Name of the module: Profile Section

Date of module Creation: 25/09/2021

Author of the module: Mohit Prajapati

What the module does: CRUD of user profile, get all projects posted by self

Functions supported:
1. createProfile  => Input: id, profile fields;       Output: "Profile Created Successfully!"
2. getProfile     => Input: id;                       Output: User data
3. updateProfile  => Input: id, fields to be updated; Output: "Profile updated successfully!"
4. getProjects    => Input: id;                       Output: All related projects will be displayed

Global variables: user id
*/

const Profile = require('../models/profileModel');
const Users = require('../models/userModel');
const Projects = require('../models/projectModel');

const profileCtrl = {
    // create profile of the user
    createProfile: async (req, res) => {
        try {
            const id = req.user.id;

            const check = await Profile.findOne({ creator: id }).exec();
            

            if (!check) {
                const { institute, department, contact, github, linkedIn, areaOfInterest } = req.body;

                const newProfile = new Profile({
                    creator: req.user.id,
                    institute,
                    department,
                    contact,
                    github,
                    linkedIn,
                    areaOfInterest,
                    flag: 1
                });

                await newProfile.save();
                const resp = await Users.findOneAndUpdate({ _id: req.user.id }, {
                    flag: 1
                });
                // console.log(resp);
                // console.log(newProfile);

                res.json({ msg: "Profile Created Successfully!" });
            } else {
                res.json({ msg: "You have already created your profile!!!" });
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get profile
    getProfile: async (req, res) => {
        try {
            const userProfile = await Profile.findOne({ creator: req.user.id });
            const users = await Users.findOne({ _id: req.user.id });

            if (userProfile) {
                const user = {
                    name: users.name,
                    avatar: users.avatar,
                    institute: userProfile.institute,
                    department: userProfile.department,
                    contact: userProfile.contact,
                    email: users.email,
                    github: userProfile.github,
                    linkedIn: userProfile.linkedIn,
                    areaOfInterest: userProfile.areaOfInterest,
                    avatar: users.avatar,
                    flag: 1,
                    role: users.role
                }

                res.json(user);
            } else {
                const user = {
                    name: users.name,
                    email: users.email,
                    flag: 0
                }

                return res.json(user);
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // update profile
    updateProfile: async (req, res) => {
        try {
            const { name, avatar } = req.body;
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, avatar
            });

            const { institute, department, contact, github, linkedIn, areaOfInterest } = req.body;

            const user = {name: name, avatar: avatar, institute: institute, department: department, contact: contact, github: github, linkedIn: linkedIn, areaOfInterest: areaOfInterest};

            await Profile.findOneAndUpdate({ creator: req.user.id }, {
                institute, department, contact, github, linkedIn, areaOfInterest
            });

            res.json({ msg: "Profile Updated Successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get all projects of a particular owner
    getProject: async (req, res) => {
        try {
            const id = req.user.id;
            const userProjects = await Projects.find({ creator: id });

            res.json(userProjects);
        } catch (err) {
            return res / status(500).json({ msg: err.message });
        }
    }
}

module.exports = profileCtrl;