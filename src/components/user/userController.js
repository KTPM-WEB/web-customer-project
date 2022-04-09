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

/************************************* POST methods *************************************/
/**
 * change profile avatar
 * @param req
 * @param res
 * @returns { Promise <*>}
 **/
module.exports.changeAvatar = async (req, res) => {
    try {

        console.log("--- user controller change avatar ---");
        await userService.changeAvatar(req.user._id, req.file);

        res.redirect('back');
    } catch (err) {
        res.status(500).json({ message: err.message });
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


