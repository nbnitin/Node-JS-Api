var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require('multer');

var mime = ["image/jpeg","image/jpg","image/png"];


//uploads category images
var categoryStorage = multer.diskStorage({
  destination:function(req,file,callback){
    if(mime.indexOf(file.mimetype) >= 0){
      //returing path to store
      callback(null,'./public/images/category');
    } else{
      //returing error
      callback("unable to upload",null);
    }
  },
  filename:function(req,file,callback){
    callback(null,file.fieldname + '_' + Date.now()+"_"+file.originalname);
  }
});

//upload cate image
exports.uploadCateImage = function(req,res,next){
  var upload = multer({
    storage: categoryStorage
  }).single('cateImage');
  upload(req,res,function(err){
    if(err){return  res.status(200).json({contents:[],statusText:"Unable to upload, Not an image",status:"0"});}
     console.log(req);
     res.status(200).json({contents:req.file.filename,statusText:"File Uploaded",status:"1"});
  });
};



//uploads product images
var productStorage = multer.diskStorage({
  destination:function(req,file,callback){
    if(mime.indexOf(file.mimetype) >= 0){
      //returing path to store
      callback(null,'./public/images/product');
    } else{
      //returing error
      callback("unable to upload",null);
    }
  },
  filename:function(req,file,callback){
    callback(null,file.fieldname + '_' + Date.now()+"_"+file.originalname);
  }
});

//upload cate image
exports.uploadProductImage = function(req,res,next){
  var upload = multer({
    storage: productStorage
  }).single('productImage');
  upload(req,res,function(err){
    if(err){return  res.status(200).json({contents:[],statusText:"Unable to upload, Not an image",status:"0"});}
     console.log(req);
     res.status(200).json({contents:req.file.filename,statusText:"File Uploaded",status:"1"});
  });
};
