const service = require('./authService');

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


/**
 * check if the user exists
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.forgotPass = async (req, res) => {
    try {
        console.log("-- api forgot pass --");

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}