const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../Models/post.model");

postRouter.post("/add", async (req, res) => {
    console.log("add")
    try {
        const post = new PostModel(req.body);
        console.log(post)
        await post.save();
        res.status(200).send({ msg: "New post has been created" });
    } catch (error) {
        console.log(error)
        res.status(400).send({ err: error.message });
    }
});

postRouter.get("/", async (req, res) => {
    try {
        const posts = await PostModel.find({ userID: req.body.userID });
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});


postRouter.patch("/update/:postID", async (req, res) => {
    const { postID } = req.params;
    const post = await PostModel.findOne({ _id: postID });
    try {
        if (req.body.userID !== post.userID) {
            res.status(200).send({ msg: `You are not authorized to do this action` });
        } else {
            await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
            res.status(200).send({ msg: `The post with id: ${postID} has been updated.` });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

postRouter.delete("/delete/:postID", async (req, res) => {
    const { postID } = req.params;
    const post = await PostModel.findOne({ _id: postID });
    try {
        if (req.body.userID !== post.userID) {
            res.status(200).send({ msg: `You are not authorized to do this action` });
        } else {
            await PostModel.findByIdAndDelete({ _id: postID });
            res.status(200).send({ msg: "The post has been deleted" });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});


module.exports = {
    postRouter
}