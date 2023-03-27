const userModel = require("../model/user.model");



const checkEmail = async (req, res, next) => {
    let { email } = req.body;
    let findemail = await userModel.findOne({ email });
    if (findemail) {
        res.status(400).send({ mssg: "email is alerdy exist" })
    } else {
        next();
    }
};


module.exports = checkEmail;