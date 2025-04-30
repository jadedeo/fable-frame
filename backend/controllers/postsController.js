import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

/************** GET ALL POSTS **************/

const getPosts = async (req, res) => {
    try {
        // can use find () with params, like find(title: "hello") to only get posts that match criteria
        const posts = await Post.find().sort({ createdAt: "desc" });
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************** GET USER POSTS **************/

const getUserPosts = async (req, res) => {
    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        // can use find () with params, like find(title: "hello") to only get posts that match criteria
        const userPosts = await Post.find({ user: user._id }).sort({
            createdAt: "desc",
        });
        res.status(200).json({ userPosts, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************** CREATE NEW POST **************/
const addPost = async (req, res) => {
    // grab data from request body
    const { title, body } = req.body;

    // res.json(req.user);

    // validation: check fields are not empty
    if (!title || !body) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        const post = await Post.create({ user: user._id, title, body });
        res.status(200).json({ success: "Post created", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************** DELETE POST **************/
const deletePost = async (req, res) => {
    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: "Post not found" });
    }

    // check user owns post
    const user = await User.findById(req.user._id);
    console.log(post.user);
    if (!post.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        await post.deleteOne();
        res.status(200).json({ success: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************** UPDATE POST **************/
const updatePost = async (req, res) => {
    // grab data from request body
    const { title, body } = req.body;

    // validation: check fields are not empty
    if (!title || !body) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check post exists
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({ error: "Post not found" });
    }

    // check user owns post
    const user = await User.findById(req.user._id);
    if (!post.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        //don't have to write title: title because const variable & field have same name; would have to be more explicit if it were like title: textFieldOne
        await post.updateOne({ title, body });
        res.status(200).json({ success: "Post updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getPosts, getUserPosts, addPost, deletePost, updatePost };
