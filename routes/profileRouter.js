const router = require('express').Router();
const profileCtrl = require('../controllers/profileCtrl');
const auth = require('../middleware/auth');

// routes for various request
router.post('/createprofile', auth, profileCtrl.createProfile);
router.get('/getprofile', auth, profileCtrl.getProfile);
router.patch('/updateprofile', auth, profileCtrl.updateProfile);
router.get('/getprojects', auth, profileCtrl.getProject);

module.exports = router;