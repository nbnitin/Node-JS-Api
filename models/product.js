var s = require("../config/dbConnection");
var mongodb = require('mongodb');
var fs = require('fs');

var createProduct = function(details, cb) {
    var db = s.dbService.db;
    db.collection("category").findOneAndUpdate({
        _id: new mongodb.ObjectID(details._id)
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
        _id: new mongodb.ObjectID(details._id)
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

var searchProduct = function(details, cb) {
    var db = s.dbService.db;
    console.log(details);
    //the first method to find child object is below, this will return you parent object also

    // db.collection("category").find({
    //     "product._productId":  new mongodb.ObjectID(details._productId)
    // }).toArray(function(err,res1){
    //   if(err) cb(err,res1);
    //   cb(err,res1);
    // })

    //but incase you don't need parent object then you can do it like below

    // db.collection("category").find({
    //     "product._productId": new mongodb.ObjectID(details._productId)
    // }, {
    //     "product": 1,
    //     "_id": 0
    // }).toArray(function(err, res1) {
    //     if (err) cb(err, res1);
    //     cb(err, res1);
    // })
    //above product :1 is you need only product document and _id is parent id object we don't require it.
    //if we set _id : 1 then you will get parent object id, becuase mongod db gives you id object by defualt.


    //othe case is also there you can use aggregate function or framework to find child object with parent id
    // db.collection("category").aggregate([{
    //     $match: {
    //         "product._productId": new mongodb.ObjectID(details._productId)
    //     }
    // }],function(err,res1){
    //   if(err) cb(err,res1);
    //   cb(err,res1);
    // })

    //in case you don't need parent id then you can use aggregate function like below
    db.collection("category").aggregate([{
        $match: {
            "product._productId": new mongodb.ObjectID(details)
        }}
        ,{$project:{"product":1,"_id":0}}],function(err,res1){
      if(err) cb(err,res1);
      cb(err,res1);
    })

    //Note:- aggregate function don't support .toArray function that why we used [] to get array of result


}

var updateProduct = function(details,cb){

      var db = s.dbService.db;
      var myquery = { "product._productId": new mongodb.ObjectID(details._productId) };
      var newValues = {};

      console.log(details);

      if(details.productImage != null && details.productImage != ""){
        newValues = {$set:{"product.$.productName": details.productName,"product.$.productImage": details.productImage}};


        var str = details.oldImageName;
        var n = str.lastIndexOf('/');
        var result = str.substring(n + 1);

  //to delete old file
        ///this below function can also be used, below function is async and also gives feedback either deleted or not

        fs.unlink("./public/images/product/"+result, function(err, result) {
          console.log("unlinkkkk"+err);
        });

            //or
  //if file doesn't exists then below function will not allow to run next code also
        //fs.unlinkSync("./public/images/category/"+result);
      } else{
        newValues = {$set:{"product.$.productName": details.productName}};
      }



      db.collection("category").update(myquery, newValues,function(err, res1) {
          if (err) cb(err, res1);
          cb(err, res1);
      });
  }





module.exports = {
    Create: createProduct,
    Delete: deleteProduct,
    Search: searchProduct,
    Update: updateProduct
}
