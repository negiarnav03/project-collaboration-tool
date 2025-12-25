const router = require('express').Router();
const contactCtrl = require('../controllers/contactCtrl');

// route to post suggestion/query
router.post('/', contactCtrl.postRequest);

module.exports = router;