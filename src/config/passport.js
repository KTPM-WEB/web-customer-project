require('dotenv').config()

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const authService = require('../components/auth/authService');
const userModel = require('../components/user/userModel');


// authN local
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    /*    console.log('Passport verify usser');
        console.log("username:", username);
        console.log("password:", password);*/

    const user = await authService.verifyUser(username, password);
    if (user) {
        /*        console.log('login success');*/
        return cb(null, user);
    }

    /*    console.log("login fail");*/
    return cb(null, false);
}));


// authN google
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, cb) => {
        // console.log('---------');
        // console.log('Passport auth google');
        // console.log("req-query:", req.query);
        // console.log("profile:", profile);

        const user = await authService.verifyGoogle(profile);

        // console.log("passport user:", user);

        if (!user) {
            if (req.query.state === 'register') {
                console.log('passport: register - account dont exist');
                const result = await authService.addUserGoogle(profile);
                console.log('result:', result);

                return cb(null, true, result);
            } else {
                return cb(null, true, {message: 'login: account dont exist'});
            }
        } else {

            if (req.query.state === 'register') {
                return cb(null, user, {message: 'register: account exist'});
            } else {
                return cb(null, user, {message: 'login: login success'});
            }
        }
    }
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            employed: user.employed,
            avatar_url: user.avatar_url,
            address: user.address,
            phone: user.phone,
            intro: user.intro,
            total: user.total,
            cart: user.cart
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;