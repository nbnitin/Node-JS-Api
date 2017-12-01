var express = require('express');
var router = express.Router();


var manageUser = require('../controllers/manage-user');
var category = require('../controllers/category');
var uploadImage = require('../controllers/uploadimage');

router.post('/addUser',manageUser.createUser);
router.post('/login',manageUser.login);
router.post('/createCategory',category.createCategory);
router.post('/showCategory',category.showCategory);
router.post('/deleteCategory',category.deleteCategory);
router.post('/uploadCateImage',uploadImage.uploadCateImage);
router.get('/searchCategory/:id',function(req,res,next){
  category.searchCategory(req.params.id,res,next);
});

// router.get('/addUser', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
