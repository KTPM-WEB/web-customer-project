const userService = require('./userService')
const productService = require("../product/productService");
const ls = require("local-storage");

/************************************* GET methods *************************************/
/**
 * display profile page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.renderProfile = async (req, res) => {
    try {
        if (!req.user) return res.redirect('/auth/login')
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
        if (!req.user) return res.redirect('/auth/login')
        res.render('user/views/order')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * GET home page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.renderHomepage = async (req, res) => {
    try {
        // check local cart

        let number_product = 0;
        if (req.user) {
            number_product = await userService.getNumberProduct(req.user._id);
            req.session.number_product = number_product;
            if (req.query.checkout === "true")
                res.render('index', { number_product, message: "Place order successful" });
        } else {
            // not login
            number_product = 1;
            if (!ls("cart"))
                ls.set("cart", JSON.stringify([]));
        }


        const products = (await productService.getAllProducts()).slice(0, 8);
        res.render('index', { number_product, products });
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


