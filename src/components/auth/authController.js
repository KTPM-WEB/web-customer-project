const service = require('../user/userService');

/*************************** GET methods ***************************/
/**
 * render login page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.renderLogin = (req, res) => {
    try {
        req.query.state = req.query.state === 'true';
        res.render("auth/views/login", { message: req.query.message, state: req.query.state });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

/**
 * render register page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.renderRegister = (req, res) => {
    try {
        req.query.state = req.query.state === 'true';
        res.render("auth/views/register", { message: req.query.message, state: req.query.state });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*************************** POST methods ***************************/
/**
 * redirect register page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.logout = async (req, res) => {
    try {
        req.session.user = null;
        await req.logout();
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        await service.forgetPassword(req.body.email);
        res.redirect("back");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        await service.changePasswordByEmail(req.body.email, req.body.newpass);
        res.redirect("back");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.confirm = async (req, res) => {
    try {
        await service.confirm(req.body.username);
        res.render("auth/views/thank-you",{layout: false});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};