const router = require('express').Router();
const projectCtrl = require('../controllers/projectCtrl');
const auth = require('../middleware/auth');

// routes for various request
router.post('/postproject', auth, projectCtrl.postProject);
router.get('/', projectCtrl.getProjects);
router.get('/:id', projectCtrl.getProject);
router.patch("/:id/likeproject", auth, projectCtrl.likeProject);
router.patch('/updateproject/:id', auth, projectCtrl.updateProject);
router.get('/deleteproject/:id', auth, projectCtrl.deleteProject);
router.patch('/:id/likePost', auth, projectCtrl.likeProject); // auth is for no of likes ie. only 1 time
// Add member to project
router.post('/:id/add-member', projectCtrl.addMember);

module.exports = router;