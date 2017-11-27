var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var assert = require('assert');
global.db;
const dbService = {
  db: undefined,
  connect: callback => {
    MongoClient.connect(url, function(err, data) {
      if (err) {
        MongoClient.close();
        callback(err);
      }
      dbService.db = data;
      callback(null);
    });
  }
};

module.exports = {dbService};
