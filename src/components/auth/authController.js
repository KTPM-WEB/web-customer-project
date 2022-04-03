const service = require('./authService');
const passport = require("../../middlewares/passport");


/*************************** GET methods ***************************/
// Render Login page
exports.renderLogin = (req, res) => {
    console.log("message:", req.query.message);
    console.log('state:', req.query.state);
    if (req.query.state === 'true') {
        req.query.state = true;
    } else
        req.query.state = false;

    res.render("auth/views/login", { message: req.query.message, state: req.query.state });
};

// Render Register page
exports.renderRegister = (req, res) => {
    console.log("message:", req.query.message);
    console.log('state:', req.query.state);
    if (req.query.state === 'true') {
        req.query.state = true;
    } else
        req.query.state = false;
    res.render("auth/views/register", { message: req.query.message, state: req.query.state });
};


// Render Register page
exports.Register = async (req, res) => {
    const register = await service.Register(req.body);

    if (register === "success") {
        message = "Create new account success";
        state = true;
    } else if (register === "existed") {
        message = "Account already exist";
        state = false;
    } else if (register === "err") {
        message = "Something wrong when create new account";
        state = false;
    } else if (register === "email_exist") {
        message = "Email already exist";
        state = false;
    }

    res.redirect("/auth/register?state=" + state + "&message=" + message);
};

