var s = require("../config/dbConnection");
var mongodb = require('mongodb');

  var createCategory = function(details, cb) {
  var db = s.dbService.db;
  db.collection("category").insertOne(details, function(err, res1) {
    if (err)  cb(err, res1);
    cb(err,"Created Successfully");
  });
  }

  var showCategory = function(details, cb) {
      var db = s.dbService.db;
      db.collection("category").find().toArray(cb);
    }

    var deleteCategory = function(details, cb) {
          var db = s.dbService.db;
          db.collection("category").deleteOne({_id: new mongodb.ObjectID(details.cateId)},function(err,res1){
            if(err) cb(err,res1);
            cb(err,"Delete Successfully");
          });
        }

module.exports = {
  Create: createCategory,
  Show: showCategory,
  Delete: deleteCategory
}
