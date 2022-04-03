const express = require("express");
const router = express.Router();
const authController = require("./authController");
const passport = require("../../middlewares/passport");
const { body } = require("express-validator");
const { addUserGoogle } = require("./authService");


/*************************** GET methods ***************************/
//render login page
router.get("/login", authController.renderLogin);

//render register page
router.get("/register", authController.renderRegister);

router.get('/register/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        state: 'register'
    }, () => next())(req, res, next);
});


router.get('/login/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        state: 'login'
    }, () => next())(req, res, next);
});


// get google callback
router.get("/google/callback", (req, res, next) => {
    passport.authenticate('google', {}, (err, user, info) => {

        console.log('--------------');
        console.log("google callback");
        console.log('user:', user);
        console.log('info:', info);

        info = info.message;


        if (info === 'login: account dont exist') {
            res.redirect('/auth/login?state=false&message=Account%20dont%20exist');
        }
        else if (info === 'login: login success') {
            req.session.user = user;
            res.redirect("/");
        }
        else try {
            if (info.includes('register')) {
                res.redirect("/auth/register?message=" + info.replace("register: ", "").replace(" ", "%20"));
            }
        }
        catch (error) {
            res.redirect("/auth/register?state=true&message=Create%20new%20user%20success");
        }
    })(req, res, next);
});

/*************************** POST methods ***************************/
router.post("/register", authController.Register);

// get login infor from client
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', //login success, save user in req.user
    failureRedirect: '/auth/login?message=Account%20dont%20exist' //login fail, redirect to login page
}));

// logout
router.post('/logout', function (req, res, next) {
    req.session.user = null;
    // req.session.message = null;
    req.logout();
    res.redirect('/');
});

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;