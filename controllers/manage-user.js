var express = require('express');
var router = express.Router();

//var db = require('../config/dbConnection.js');
var s = require("../config/dbConnection");
var userModel = require("../models/user");



//login users
exports.login = function(req, res, next) {
  console.log(req.body);
  userModel.Login(req.body, function(err, data){
        if (err) {
                console.log(err);
                return res(err);
              }
                console.log(data);
                if(data.length <= 0){
                  return res.status(200).json({contents:[],status:"invalid credentials"});
                }
                console.log(JSON.stringify(data));
                return res.status(200).json({contents:JSON.stringify(data),status:"user found"});


        });
};

exports.createUser = function(req, res, next) {
  var db = s.dbService.db;
  db.collection("customers").insertOne(req.body, function(err, res1) {
    if (err) throw err;
    console.log("1 document inserted");
    return res.status(200).json({message:"User Created!!"});
  });
};

//module.exports = router;
