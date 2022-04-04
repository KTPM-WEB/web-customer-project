const userService = require('./userService')
const {ObjectID} = require("mongodb");

module.exports.displayProfile = async (req,res) =>
{
    if (!req.user)
        return res.redirect('/auth/login')
    const user = await userService.getUserByID(ObjectID(req.user.id))
    res.render('user/views/profile',{user:user})
}


