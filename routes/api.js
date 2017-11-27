var express = require('express');
var router = express.Router();

var manageUser = require('../controllers/manage-user');

router.post('/addUser',manageUser.createUser);
router.post('/login',manageUser.login);
// router.get('/addUser', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
