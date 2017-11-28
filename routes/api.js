var express = require('express');
var router = express.Router();


var manageUser = require('../controllers/manage-user');
var category = require('../controllers/category');


router.post('/addUser',manageUser.createUser);
router.post('/login',manageUser.login);
router.post('/createCategory',category.createCategory);
router.post('/showCategory',category.showCategory);
router.post('/uploadCateImage',category.uploadCateImage);


// router.get('/addUser', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
