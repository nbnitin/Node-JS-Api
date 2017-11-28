var express = require('express');
var router = express.Router();
var path = require("path");
var s = require("../config/dbConnection");
var categoryModel = require("../models/category");
var multer = require('multer');

var storage = multer.diskStorage({
  destination:function(req,file,callback){
    // if(path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.jpeg' || path.extname(file.originalname) == '.png'  ){
      callback(null,'./public/images/category');
    // }
  },
  filename:function(req,file,callback){
    callback(null,file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});

//upload cate image
exports.uploadCateImage = function(req,res,next){
  console.log('reqqqqqq');
  var upload = multer({
    storage: storage
  }).single('cateImage');
  console.log(upload);
  upload(req,res,function(err){
    if(err){return next(err);}
     console.log(req);
    res.status(200).json({contents:'gvhgcgc',statusText:"File Uploaded",status:"1"});
  });
};

//show category
exports.showCategory = function(req, res, next) {
  console.log(req.body);
  categoryModel.Show(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }
                console.log(data);
                if(data.length <= 0){
                  return res.status(200).json({contents:[],statusText:"No category found",status:"0"});
                }
                console.log(JSON.stringify(data));
                return res.status(200).json({contents:JSON.stringify(data),statusText:"category found",status:"1"});


        });
};

exports.createCategory = function(req, res, next) {
  console.log();
    categoryModel.Create(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }
                console.log("hello"+data);
                return res.status(200).json({contents:data,status:"1",statusText:"Category Created"});
                // if(data.length <= 0){
                //   return res.status(200).json({contents:[],status:"No category found"});
                // }
                // console.log(JSON.stringify(data));
                // return res.status(200).json({contents:JSON.stringify(data),status:"category found"});


        });
};
