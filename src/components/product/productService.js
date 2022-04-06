const async = require('hbs/lib/async');
const productModel = require('./productModel');
const userModel = require('../auth/authModel');
const productReview = require('./productReviewModel');
const mongoose = require("mongoose");
const { ObjectID, Timestamp } = require("mongodb");
const { use } = require('passport');



module.exports.getAllProducts = async () => {
  try {
    return await productModel.find().lean();
  } catch (err) {
    throw err;
  }
};

module.exports.getProductByID = (id) => {

  return productModel.findOne({ _id: id }).lean();
}


module.exports.getDistinctByField = (field) => {
  return productModel.find({}, { field: 1 }).distinct(field).lean()
}


module.exports.getRelatedList = (categoryValue) => {
  return productModel.aggregate([
    { "$match": { "category": { "$eq": categoryValue } } },
    { "$sample": { "size": 4 } }
  ])
}

module.exports.createReview = (userName, productID, content) => {
  return new productReview({
    userName: userName,
    productID: productID,
    content: content,
    createdAt: Date.now()
  }).save();
}

module.exports.getAllReviewByProductID = (productID) => {
  return productReview.find({ productID: productID }).lean();
}

module.exports.addToCart = async (productID, user_id, quantity = 1) => {
  try {
    console.log("service add to cart");
    var user = await userModel.findOne({ _id: user_id });
    const product = await productModel.findOne({ _id: productID });

    if (user && product) {

      // product exist in cart
      let itemIdx = user.cart.findIndex(item => item.productID == productID);
      console.log("itemIdx: " + itemIdx);

      if (itemIdx > -1) {
        // product exist in cart, update quantity
        console.log("update quantity");
        user.cart[itemIdx].quantity += quantity;
        user.cart[itemIdx].total = user.cart[itemIdx].quantity * product.price;
      } else {
        // product not exist in cart, add new item
        console.log("push new product");
        user.cart.push({
          productID: productID,
          quantity: 1,
          total: product.price
        });
      }

      user.total = 0;

      for (let i = 0; i < user.cart.length; i++) {
        const product_total = await productModel.findOne({ _id: user.cart[i].productID });
        user.total += user.cart[i].quantity * product_total.price;
      }

      user.total = Math.round(user.total * 100) / 100;

      user = await user.save();

      return user;
    }
  }
  catch (err) {
    console.log("err:", err);
    throw err;
  }

}
