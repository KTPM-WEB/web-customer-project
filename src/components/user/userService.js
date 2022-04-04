const userModel = require('../auth/authModel');

module.exports.getUserByID = (userID) =>
{
    return userModel.findOne({_id: userID}).lean();
}