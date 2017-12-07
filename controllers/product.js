var express = require('express');
var router = express.Router();
var path = require("path");
var s = require("../config/dbConnection");
var productModel = require("../models/product");

exports.createProduct = function(req, res, next) {
    productModel.Create(req.body, function(err, data){
      if (err) {
              console.log(err);
              return res.send(err);
            }
      if(data.length <= 0){
        return res.status(200).json({contents:[],status:"1",statusText:"failed to create"});
      }
      console.log(JSON.stringify(data));
      return res.status(200).json({contents:JSON.stringify(data),status:"1",statusText:"product created"});
    });
};

exports.deleteProduct = function(req, res, next) {
    productModel.Delete(req.body, function(err, data){
      if (err) {
              console.log(err);
              return res.send(err);
            }
      if(data.length <= 0){
        return res.status(200).json({contents:[],status:"1",statusText:"failed to delete"});
      }
      console.log(JSON.stringify(data));
      return res.status(200).json({contents:JSON.stringify(data),status:"1",statusText:"product deleted"});
    });
};
