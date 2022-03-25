const model = require('./productModel');

module.exports.getAllProducts = async () => {
  try {
      return await model.find().lean();
  } catch (err) {
      throw err;
  }
};