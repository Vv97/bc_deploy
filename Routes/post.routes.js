const { Router } = require("express");
const postModel = require("../model/post.model");
const postRouter = Router();


postRouter.get("/", async (req, res) => {
    const { userId } = req.body;
    const { device, min, max } = req.query;


    const obj = {
        userId
    };

    if (device) {
        obj.device = device
    }


    if (min && max) {
        obj.no_of_comments = { $and: [{ no_of_comments: { $gte: min } }, { no_of_comments: { $lte: max } }] }
    }


    try {
        let userdata = await postModel.find({ $and: [{ no_of_comments: { $gte: min } }, { no_of_comments: { $lte: max } }] });
        res.status(200).send(userdata)
    } catch (error) {
        res.status(400).send(error)
    }
})


postRouter.post("/add", async (req, res) => {
    try {
        const newPost = postModel(req.body);
        await newPost.save();

        res.status(200).send({ mssg: "new post added" });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});


postRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;

    await postModel.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).send({ mssg: "post update succesful!" });

});

postRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    await postModel.findByIdAndDelete({ _id: id });

    res.status(200).send({ mssg: "post delete succesful!" });

});


module.exports = postRouter;