const express = require("express");
const router = express.Router();
const authController = require("./authController");
const passport = require("../../middlewares/passport");

/*************************** GET methods ***************************/
//render login page
router.get("/login", authController.renderLogin);

//render register page
router.get("/register", authController.renderRegister);

// logout
router.get('/logout', authController.logout);

router.get('/register/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'register'
}));

router.get('/login/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'login'
}));

// get google callback
router.get("/google/callback", authController.callBack);

/*************************** POST methods ***************************/
router.post("/register", authController.Register);

// get login infor from client
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', //login success, save user in req.user
    failureRedirect: '/auth/login?message=Account%20dont%20exist' //login fail, redirect to login page
}));

router.get('/logout',authController.logout)


/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;