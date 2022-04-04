const async = require('hbs/lib/async');
const model = require('./productModel');



module.exports.getAllProducts = async () => {
  try {
      return await model.find().lean();
  } catch (err) {
      throw err;
  }
};

module.exports.getProductByID = (id) => {
  
  return model.findOne({_id: id}).lean();
}


module.exports.getDistinctByField = (field) => {
  return model.find({},{field:1}).distinct(field).lean()
}


module.exports.getRelatedList = (categoryValue) =>
{
  return model.aggregate([
    { "$match": { "category": { "$eq": categoryValue } } },
    { "$sample": { "size": 4 } }
])
}