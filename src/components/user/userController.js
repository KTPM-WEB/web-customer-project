const userService = require('./userService')

/************************************* GET methods *************************************/
/**
 * display profile page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.displayProfile = async (req, res) => {
    try {
        if (!req.user)
            return res.redirect('/auth/login')
        const user = await userService.getUserByID(req.user.id)
        res.render('user/views/profile', {user: user})
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

/************************************* PUT methods *************************************/
/**
 * change profile of user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.editProfile = async (req, res) => {
    try {
        await userService.updateUser(req.user.username, req.body.field, req.body.value)
        res.redirect("/user/profile")
    }catch (err) {
        res.status(500).json({message: err.message});
    }

}


