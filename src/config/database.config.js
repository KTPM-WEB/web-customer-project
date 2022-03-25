const dotenv = require('dotenv')
const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://web-project:IScAQxMVEqWfZgnr@cluster0-shard-00-00.3ausv.mongodb.net:27017,cluster0-shard-00-01.3ausv.mongodb.net:27017,cluster0-shard-00-02.3ausv.mongodb.net:27017/WebProject?authSource=admin&replicaSet=atlas-5zsic0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true');
        console.log('Connection to the database has been established successfully.');
    }
    catch (error) {
        console.error(error.message);
        process.exit(-1);
    }
}

module.exports = { connect };
