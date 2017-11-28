var s = require("../config/dbConnection");

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

module.exports = {
  Create: createCategory,
  Show: showCategory
}
