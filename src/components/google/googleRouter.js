const router = require("express").Router();

const passport = require("../../config/passport");

router.get('/register', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'register'
}));

router.get('/login', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'login'
}));

// get google callback
router.get("/callback", (req, res, next) => {
    passport.authenticate('google', {}, (err, user, info) => {
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

module.exports = router;