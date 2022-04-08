const userService = require('./userService')

/************************************* GET methods *************************************/
/**
 * display profile page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.renderProfile = async (req, res) => {
    try {
        if (!req.user)
            return res.redirect('/auth/login')

        res.render('user/views/profile')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


/**
 * display order page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.renderOrder = async (req, res) => {
    try {
        if (!req.user)
            return res.redirect('/auth/login')

        console.log("--- user controller get order ---");

        res.render('user/views/order')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * change profile of user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
/************************************* PUT methods *************************************/
module.exports.editProfile = async (req, res) => {
    try {
        await userService.updateUser(req.user.username, req.body.field, req.body.value)

        res.redirect("/user/profile")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


