var express = require('express');
var router = express.Router();
var path = require("path");
var s = require("../config/dbConnection");
var categoryModel = require("../models/category");
var multer = require('multer');


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

exports.deleteCategory = function(req, res, next) {
  console.log(req.body);
    categoryModel.Delete(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }
                console.log("hello"+data);
                return res.status(200).json({contents:data,status:"1",statusText:"Category Deleted"});
                // if(data.length <= 0){
                //   return res.status(200).json({contents:[],status:"No category found"});
                // }
                // console.log(JSON.stringify(data));
                // return res.status(200).json({contents:JSON.stringify(data),status:"category found"});


        });
};

exports.searchCategory = function(id, res, next) {
  console.log(id);
    categoryModel.Search(id, function(err, data){
        if (err) {
                console.log(err);
                return res.send(err);
              }
                if(data.length <= 0){
                  return res.status(200).json({contents:[],status:"0",statusText:"No category found"});
                }
                return res.status(200).json({contents:JSON.stringify(data),status:"1",statusText:"category found"});


        });
};
