var s = require("../config/dbConnection");

var loginUser = function(details, cb) {
    var db = s.dbService.db;
    db.collection("customers").find({'userName': details.userName,'password':details.password}).toArray(cb);
  }

module.exports = {
  Login: loginUser
}
