const router = require('express').Router();
const requestCtrl = require('../controllers/requestCtrl');
const auth = require('../middleware/auth');

// routes for various request
router.post('/:id', auth, requestCtrl.joinProject);

module.exports = router;