const userModel = require('../user/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * register
 * @param body {object}
 * @returns {Promise<*>}
 */
module.exports.Register = async (body) => {
    try {
        // check input fields
        if (!body.username || !body.password || !body.email) return "input_error";
        const find_user = await userModel.findOne({username: body.username});
        if (find_user !== null) return "existed";
        //check email
        const email = await userModel.findOne({email: body.email});

        if (email) return "email_exist";

        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash_pass = await bcrypt.hashSync(body.password, salt);

        const now = (new Date()).toString().split(" ");

        const user = {
            username: body.username,
            fullname: '',
            password: hash_pass,
            email: body.email,
            role: "User",
            employed: now[2] + ' ' + now[1] + ',' + now[3],
            address: "",
            phone: "",
            intro: "",
            total: 0,
            avatar_url: "https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg", //default avatar
        }
        // insert 
        await userModel.insertMany(user)
        return "success";

    } catch (err) {
        /*console.log(error);*/
        throw err;
    }
}

/**
 * register
 * @param username {string}
 * @param password {string}
 * @returns {Promise<user||false>}
 */
module.exports.verifyUser = async (username, password) => {
    try {
        const user = await userModel.findOne({username: username});
        if (!user) return false;
        else if (await bcrypt.compareSync(password, user.password)) return user;
        return false;
    } catch (err) {
        throw err;
    }
}


