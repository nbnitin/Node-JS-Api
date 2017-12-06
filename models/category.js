var s = require("../config/dbConnection");
var mongodb = require('mongodb');

var createCategory = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").insertOne(details, function(err, res1) {
        if (err) cb(err, res1);
        cb(err, "Created Successfully");
    });
}

var showCategory = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").find().toArray(cb);
}

var deleteCategory = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").deleteOne({
        _id: new mongodb.ObjectID(details._id)
    }, function(err, res1) {
        if (err) cb(err, res1);
        cb(err, "Delete Successfully");
    });
}

var searchCategory = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").find({
        _id: new mongodb.ObjectID(details)
    }).toArray(function(err,res){
      if (err) return cb(err,res);
      cb(err,res);
    })
}

var updateCategory = function(details, cb) {
    var db = s.dbService.db;
    var myquery = { _id: new mongodb.ObjectID(details._id) };
    var newValues = {};

    if(details.cateImage != null && details.cateImage != ""){
      newValues = {cateName: details.cateName,cateImage: details.cateImage};
    } else{
      newValues = {cateName: details.cateName};
    }

    console.log(newValues + "hjhsdj");

    db.collection("category").updateOne(myquery, newValues,function(err, res1) {
        if (err) cb(err, res1);
        cb(err, res1);
    });
}

module.exports = {
    Create: createCategory,
    Show: showCategory,
    Delete: deleteCategory,
    Search: searchCategory,
    Update: updateCategory
}
