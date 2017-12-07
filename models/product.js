var s = require("../config/dbConnection");
var mongodb = require('mongodb');
var fs = require('fs');

var createProduct = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").findOneAndUpdate({
        _id:  new mongodb.ObjectID(details._id)
    }, {
        $push: {
            product: {
                _productId: new mongodb.ObjectID(),
                productName: details.productName,
                productImage: details.productImage
            }
        }
    }, function(err, res1) {
      if (err) cb(err, res1);
      cb(err, "Product Created Successfully");
    });
}

var deleteProduct = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").findOneAndUpdate({
        _id:  new mongodb.ObjectID(details._id)
    }, {
        $pull: {
            product: {
                _productId: new mongodb.ObjectID(details._productId),
            }
        }
    }, function(err, res1) {
      if (err) cb(err, res1);
      cb(err, "Product Deleted Successfully");
    });
}

module.exports = {
    Create: createProduct,
    Delete: deleteProduct
}
