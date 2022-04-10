const userService = require("../../user/userService");

/**
 * check if the user exists
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.checkUserName = async (req, res) => {
    try {
        const check = await userService.checkUserName(req.body.username);
        if (check) {
            res.json({ check: true });
        } else {
            res.json({ check: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * check if the email exists
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.checkEmail = async (req, res) => {
    try {
        const check = await userService.checkEmail(req.body.email);
        if (check) {
            res.json({ check: true });
        } else {
            res.json({ check: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}