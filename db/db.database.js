const mongoose = require("mongoose");
require("dotenv").config();


const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_URL);
        console.log("db is connected")
    } catch (error) {
        console.log(error);
    };
};


module.exports = mongoConnect;