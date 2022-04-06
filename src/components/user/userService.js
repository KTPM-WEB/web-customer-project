const userModel = require('../auth/authModel');

/**
 * get user by ID
 * @param userID {string}
 * @returns {Promise<*>}
 */
module.exports.getUserByID = (userID) =>
{
    try {
        return userModel.findById(userID).lean();
    }catch (err){
        throw err;
    }

}

/**
 * display profile page
 * @param username
 * @param field
 * @param new_value
 * @returns {Promise<*>}
 */
module.exports.updateUser = (username,field,new_value) =>
{
    try {
        return userModel.findOneAndUpdate({username:username},{$set:{[field]:new_value}},{new:true});
    }catch (err){
        throw err;
    }
}