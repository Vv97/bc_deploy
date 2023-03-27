const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    body: {
        type: String,
        require: true
    },

    device: {
        type: String,
        require: true
    },


    no_of_comments: {
        type: Number,
        require: true
    },

    userId: {
        type: String,
    }

}, {
    versionKey: false
});


const postModel = mongoose.model("post", postSchema);

module.exports = postModel;