
const userModel = require('./authModel');
const passport = require("../../middlewares/passport");

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.Register = async (body) => {
    try {

        // check input fields
        if (!body.username || !body.password || !body.email) {
            return "input_error";
        }

        const find_user = await userModel.findOne({ username: body.username });
        if (find_user !== null) {
            return "existed";
        }

        //check email
        const email = await userModel.findOne({ email: body.email });
        /*console.log('email: ', email);*/
        if (email) {
            return "email_exist";
        }

        /*console.log('req.body: ', body);*/
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash_pass = bcrypt.hashSync(body.password, salt);

        // get datetime
        const now = (new Date()).toString().split(" ");

        const user = {
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            fullname: body.firstName + ' ' + body.lastName,
            password: hash_pass,
            email: body.email,
            role: "User",
            employed: now[2] + ' ' + now[1] + ',' + now[3],
            address: "",
            phone: "",
            intro: "",
            avatar_url: "https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg", //default avatar
        }

        // insert 
        await userModel.insertMany(user)

        return "success";

    } catch (error) {
        /*console.log(error);*/
        return "err";
    }
}


module.exports.addUserGoogle = async (profile) => {
    if (this.verifyGoogle(profile) !== 'false') {
        // create new user

        //                             employed: now[2] + ' ' + now[1] + ',' + now[3],
        //                                 address: "",
        //                                     phone: "",
        //                                         intro: "",
        //                                             avatar_url: "https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg", //default avatar

        // get datetime
        const now = (new Date()).toString().split(" ");

        const user = {
            googleId: profile.id,
            username: profile.displayName,
            fullname: profile.name.familyName + ' ' + profile.name.givenName,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            email: profile.email,
            role: "User",
            employed: now[2] + ' ' + now[1] + ',' + now[3],
            address: profile.locale || "",
            phone: "",
            intro: "",
            avatar_url: profile.picture || "https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg", //default avatar
        }

        // insert
        const result = await userModel.insertMany(user)

        if (result) {
            /*console.log("insert success");*/
            return "register: Create new account success&state=true";
        } else {
            /*console.log("insert fail");*/
            return "register: Can not create new account&state=false";
        }
    }
    else {
        return "register: This account already existed&state=false";
    }
}


module.exports.verifyUser = async (username, passport) => {
    /*console.log('verify usser');*/
    const user = await userModel.findOne({ username: username });
    if (!user) {
        return false;
    }

    if (bcrypt.compareSync(passport, user.password)) {
        return user;
    }

    return false;
}

module.exports.verifyGoogle = async (profile) => {

    /*console.log('Verify google');*/
    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);

    // Check if google profile exist.
    if (profile.id) {
        const user = await userModel.findOne({ googleId: profile.id })
        /*console.log("find user: ", user);*/

        if (user) {
            /*console.log("user exist");*/
            return user;
        }
    }
    return 'false';

}


