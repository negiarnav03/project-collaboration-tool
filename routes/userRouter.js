const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// routes for various request
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/refresh_token', userCtrl.getAccessToken);
router.post('/forgotpassword', userCtrl.forgotPassword);
router.post('/resetpassword', auth, userCtrl.resetPassword);
router.get('/logout', userCtrl.logout);
//router.post('/googlelogin', userCtrl.googleLogin);
router.get('/getUser/:email', userCtrl.getUser);

// router.patch('/updaterights/:id', auth, authAdmin, userCtrl.updateUsersRole);
// router.get('/allusersinfo', auth, authAdmin, userCtrl.getAllUsers);
// router.get('/userinfo', auth, userCtrl.getUserInfo);
// router.patch('/updateprofile', auth, userCtrl.updateUserDetails);
// router.delete('/deleteprofile/:id', auth, authAdmin, userCtrl.deleteUser);

module.exports = router;