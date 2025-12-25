import React, { useState } from 'react'
import './input-userprofile-info.css'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { isEmpty, isContact } from '../../utils/validation/Validation';

const initialState = {
    name: '',
    institute: '',
    department: '',
    contact: '',
    github: '',
    linkedIn: '',
    areaOfInterest: '',
    err: '',
    success: ''
}

const InputUserProfileInfo = () => {

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const history = useHistory();

    const { user } = auth;

    const [data, setData] = useState(initialState);
    const { name, institute, department, contact, github, linkedIn, areaOfInterest, err, success } = data;

    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log(user.avatar);
    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        try {
            // if (isEmpty(name) || isEmpty(institute) || isEmpty(department) || isEmpty(contact) || isEmpty(areaOfInterest))
            //     return setData({ ...data, err: '', success: "Please fill required fields" });

            // if (!isContact(contact))
            //     return setData({ ...data, err: '', success: "Please enter valid contact number" });

            if (user.flag === 0) {

                axios.post('/profile/createprofile', {
                    name: name ? name : user.name,
                    avatar: avatar ? avatar : user.avatar,
                    institute: institute ? institute : user.institute,
                    department: department ? department : user.department,
                    contact: contact ? contact : user.contact,
                    github: github ? github : user.github,
                    linkedIn: linkedIn ? linkedIn : user.linkedIn,
                    areaOfInterest: areaOfInterest ? areaOfInterest : user.areaOfInterest
                }, {
                    headers: { Authorization: token }
                });

                setData({ ...data, err: '', success: "Profile Created Successfully :)" });
            } else if (user.flag === 1) {
                axios.patch('/profile/updateprofile', {
                    name: name ? name : user.name,
                    avatar: avatar ? avatar : user.avatar,
                    institute: institute ? institute : user.institute,
                    department: department ? department : user.department,
                    contact: contact ? contact : user.contact,
                    github: github ? github : user.github,
                    linkedIn: linkedIn ? linkedIn : user.linkedIn,
                    areaOfInterest: areaOfInterest ? areaOfInterest : user.areaOfInterest
                }, {
                    headers: { Authorization: token }
                });
            }

            // history.push('/dashboard');
            window.location.replace('/dashboard');
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' });
        }
    }

    const changeAvatar = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];

            if (!file)
                return setData({ ...data, err: "No files were uploaded.", success: '' });

            if (file.size > 1024 * 1024)
                return setData({ ...data, err: "Size too large.", success: '' });

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
                return setData({ ...data, err: "File format is incorrect.", success: '' });

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            });

            setLoading(false);
            setAvatar(res.data.url);

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' });
        }
    }


    return (
        <>
            <div className="input-userprofile-main-container mt-5">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3></h3>}
                <div class="input-userprofile-sub-container">

                    <div class="input-userprofile-header">
                        {user.flag === 0 ? "Complete You Profile" : "Update Your Profile"}
                    </div>

                    <div class="input-form-div">

                        <div className="input-userprofile-img">
                            <div class="profile-pic-div">
                                <img src={avatar ? avatar : user.avatar} alt="" id="user-img" />
                                <input type="file" name="file" id="input-user-pic" onChange={changeAvatar} />
                                <label htmlFor="input-user-pic" id="upload-userpic">PROFILE</label>
                            </div>
                        </div>

                        <form action="#" onSubmit={handleUpdate}>

                            <div class="userProfile-details">
                                <div class="input-box">
                                    <span class="details">Full Name*</span>
                                    <input type="text" name="name" id="name" placeholder="Enter Your Name" defaultValue={user.name} onChange={handleChange} required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Institute*</span>
                                    <input type="text" name="institute" id="institute" placeholder="Enter Your Institute Name" defaultValue={user.institute} onChange={handleChange} required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Email ID</span>
                                    <input type="text" placeholder="Enter Your Email ID" value={user.email} disabled required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Department*</span>
                                    <input type="text" name="department" id="department" placeholder="Enter Your Department Name" defaultValue={user.department} onChange={handleChange} required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Contact Number*</span>
                                    <input type="text" name="contact" id="contact" placeholder="Enter your number" defaultValue={user.contact} onChange={handleChange} required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Area Of Interest*</span>
                                    <input type="text" name="areaOfInterest" id="areaOfInterest" placeholder="Enter Your Intrested Areas" defaultValue={user.areaOfInterest} onChange={handleChange} required />
                                </div>
                                <div class="input-box">
                                    <span class="details">Github </span>
                                    <input type="text" name="github" id="github" placeholder="Enter Your Github Profile Link" defaultValue={user.github} onChange={handleChange} />
                                </div>
                                <div class="input-box">
                                    <span class="details">Linkedin </span>
                                    <input type="text" name="linkedIn" id="linkedIn" placeholder="Enter Your Linkedin Profile Link" defaultValue={user.linkedIn} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Save button and up=userprofile  */}
                            <div class="input-up-button">
                                {/* <button type="button" disabled={loading} onClick={handleUpdate}>SAVE</button> */}
                                <input disabled={loading} type="submit" value="SAVE" />
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default InputUserProfileInfo