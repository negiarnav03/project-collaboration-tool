/*
Name of the module: Authentication

Date of module Creation: 11/09/2021

Author of the module: Mohit Prajapati

What the module does: Register new user, verify email, login, forgot password, reset password, logout, google login

Functions supported:
1. register              => Input: name, email, password;  Output: "Successfully Registered! Please activate you email :)"
2. activateEmail         => Input: activation_token;       Output: "Account has been activated!"
3. login                 => Input: email, password;        Output: "Successfully logged you in :)"
4. forgotPassword        => Input: email;                  Output: "Please check your email to change the password."
5. resetPassword         => Input: password;               Output: "Password successfully changed!"
6. logout                => Input: --;                     Output: "Logged out."
7. googleLogin           => Input: tokenId;                Output: "Loggedin Successfully!"
8. validateEmail         => Input: email;                  Output: email
9. createActivationToken => Input: payload;                Output: activation token
10. createRefreshToken   => Input: payload;                Output: refresh token
11. createAccessToken    => Input: payload;                Output: access token

Global variables: --
*/

const Users = require('../models/userModel');
const Profile = require('../models/profileModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const sendMail = require('./sendMail');
//const { google } = require('googleapis');

//const { OAuth2 } = google.auth;
//const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userCtrl = {
    // registration
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill all details" });
            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email" });
            const user = await Users.findOne({ email })
            if (user)
                return res.status(400).json({ msg: "This email already exists." });
            if (password.length < 8)
                return res.status(400).json({ msg: "Password must be at least 8 characters." });
            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new Users({ name, email, password: passwordHash });
            await newUser.save();
            res.json({ msg: "Successfully Registered! You can now login." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // forgot password feature removed
    forgotPassword: async (req, res) => {
        return res.status(400).json({ msg: "Password reset/forgot password feature is disabled." });
    },
    // login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "Invalid credentials!! Try again." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!! Try again." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({ msg: "Successfully logged you in :)" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get access token
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login again!" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login again!" });

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // reset password
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;

            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            });

            res.json({ msg: "Password successfully changed!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
            return res.json({ msg: "Logged out." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // login with google
    // googleLogin: async (req, res) => {
    //     try {
    //         const { tokenId } = req.body;

    //         const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID });

    //         const { email_verified, email, name, picture } = verify.payload;

    //         const password = email + process.env.GOOGLE_SECRET;

    //         const passwordHash = await bcrypt.hash(password, 12);

    //         if (!email_verified) return res.status(400).json({ msg: "Email verification failed." });

    //         const user = await Users.findOne({ email });

    //         if (user) {
    //             const isMatch = await bcrypt.compare(password, user.password);
    //             if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

    //             const refresh_token = createRefreshToken({ id: user._id });
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    //             });

    //             res.json({ msg: "Loggedin Successfully!" });
    //         } else {
    //             const newUser = new Users({
    //                 name, email, password: passwordHash, avatar: picture
    //             });

    //             await newUser.save();

    //             const refresh_token = createRefreshToken({ id: newUser._id });
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    //             });

    //             res.json({ msg: "Loggedin Successfully!" });
    //         }


    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },

    // get flag from user to check if he has created profile or not
    getUser: async (req, res) => {
        try {
            const email = req.params.email;
            const user = await Users.findOne({ email }).select('-password');

            res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

/*
    // extra
    // update role i.e., make admin or not 
    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body;

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            });

            res.json({ msg: "Role Updated Successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // fetch all users for admin
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find().select('-password');

            // console.log(users);
            res.json(users);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get user details
    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');

            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // update user details
    updateUserDetails: async (req, res) => {
        try {
            const { name, avatar } = req.body;
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, avatar
            });

            res.json({ msg: "Updated Successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // delete user by admin
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);

            res.json({ msg: "Deleted Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
*/

}

// validation of email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// activation token
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

module.exports = userCtrl;