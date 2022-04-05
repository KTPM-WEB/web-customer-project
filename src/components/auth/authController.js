const service = require('./authService');
const passport = require("../../middlewares/passport");


/*************************** GET methods ***************************/
// Render Login page
exports.renderLogin = (req, res) => {
    req.query.state = req.query.state === 'true';
    res.render("auth/views/login", {message: req.query.message, state: req.query.state});
};

// Render Register page
exports.renderRegister = (req, res) => {
    req.query.state = req.query.state === 'true';
    res.render("auth/views/register", {message: req.query.message, state: req.query.state});
};


// Render Register page
exports.Register = async (req, res) => {
    try {
        const register = await service.Register(req.body);

        let message = register.message;
        let state = register.state;
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
        } else if (register === "input_error") {
            message = "Please input all field";
            state = false;
        }
        res.redirect("/auth/register?state=" + state + "&message=" + message);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.logout = async (req, res) => {
    req.session.user = null;
    await req.logout();
    res.redirect('/');
};

exports.callBack = async (req, res) => {
    try {
        await passport.authenticate('google', {}, (err, user, info) => {
            info = info.message;
            if (info === 'login: account dont exist') {
                res.redirect('/auth/login?state=false&message=Account%20dont%20exist');
            } else if (info === 'login: login success') {
                req.session.user = user;
                res.redirect("/");
            } else try {
                if (info.includes('register')) {
                    res.redirect("/auth/register?message=" + info.replace("register: ", "").replace(" ", "%20"));
                }
            } catch (error) {
                res.redirect("/auth/register?state=true&message=Create%20new%20user%20success");
            }
        })
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};