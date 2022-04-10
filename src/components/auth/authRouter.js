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
    failureRedirect: '/auth/login?message=Login%20Fail%20' //login fail, redirect to login page
}));

// forgot pass
router.post("/confirm", authController.confirm);

// forgot pass
router.post("/forgot-pass", authController.forgetPassword);

// reset pass
router.post("/reset-password", authController.changePassword);
/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;