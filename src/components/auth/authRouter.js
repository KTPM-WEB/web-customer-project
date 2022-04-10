const router = require("express").Router();
const authController = require("./authController");
const passport = require("../../config/passport");

/*************************** GET methods ***************************/
//render login page
router.get("/login", authController.renderLogin);

//render register page
router.get("/register", authController.renderRegister);

// logout
router.get('/logout', authController.logout);

/*************************** POST methods ***************************/
// get login info from client
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', //login success, save user in req.user
    failureRedirect: '/auth/login?message=Account%20dont%20exist' //login fail, redirect to login page
}));

// forgot pass
router.post("/forgot-pass", authController.forgotPass);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;