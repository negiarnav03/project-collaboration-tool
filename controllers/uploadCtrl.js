/*
Name of the module: Uplaod Avatar

Date of module Creation: 25/09/2021

Author of the module: Mohit Prajapati

What the module does: Uploads the image of user into cloudinary

Functions supported:
1. uploadAvatar => Input: file; Output: "Image uploaded successfully"

Global variables: user id
*/

const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadCtrl = {
    // upload image
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath);

                res.json({ url: result.secure_url });
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    });
}

module.exports = uploadCtrl;