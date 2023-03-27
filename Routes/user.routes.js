const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const checkEmail = require("../middleware/checkemail.middleware");
const userRouter = Router();


userRouter.post("/register", checkEmail, (req, res) => {
    const { name, email, password, age, gender, city, is_married } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                let newUer = userModel({
                    name,
                    email,
                    password: hash,
                    age,
                    gender,
                    city,
                    is_married
                })

                await newUer.save();
                res.status(200).send({ mssg: "register succesful!" });

            } else {
                res.status(400).send(err);
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
})



userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let findemail = await userModel.findOne({ email })

    if (findemail) {
        bcrypt.compare(password, findemail.password, (err, ans) => {
            if (ans) {
                res.status(200).send({ mssg: "login succesful!", token: jwt.sign({ _id: findemail._id }, "volvo") });
            } else {
                res.status(400).send({ mssg: "wrong password!" })
            }
        })
    } else {
        res.status(400).send({ mssg: "invalid email!" })
    }
})


module.exports = userRouter;