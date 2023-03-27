const jwt = require("jsonwebtoken");

const autherization = (req, res, next) => {
    try {
        let auth = req.headers.authorization;
        let { _id } = jwt.verify(auth, "volvo");
        if (_id) {
            if (req.method == "POST" || req.method == "GET") {
                req.body.userId = _id;
            }
            next();
        } else {
            res.status(400).send({ mssg: "register required!" })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = autherization;