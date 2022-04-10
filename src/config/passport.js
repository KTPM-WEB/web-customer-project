require('dotenv').config()

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const googleService = require('../components/google/googleService');
const authService = require('../components/auth/authService');

// authN local
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await authService.verifyUser(username, password);
        if (user) return cb(null, user);
        return cb(null, false);
    } catch (err) {
        throw err;
    }
}));

// authN google
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/google/callback',
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, cb) => {
        try {
            const user = await googleService.verifyGoogle(profile);
            if (!user) {
                if (req.query.state === 'register') {
                    const result = await googleService.addUserGoogle(profile);

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
        } catch (err) {
            throw err;
        }
    }
));

passport.serializeUser(function (user, cb) {
    try {
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
    } catch (err) {
        throw err;
    }
});

passport.deserializeUser(function (user, cb) {
    try {
        process.nextTick(function () {
            cb(null, user);
        });
    } catch (err) {
        throw err;
    }
});

module.exports = passport;