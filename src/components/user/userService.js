const userModel = require('../auth/authModel');

module.exports.getUserByID = (userID) =>
{
    return userModel.findOne({_id: userID}).lean();
}

module.exports.updateUser = (username,field,new_value) =>
{
    let key=field.toString();
    return userModel.updateMany({username: username }, { $set: { [key]: new_value } });
}