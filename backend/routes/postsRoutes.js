import express from "express";
import {
    addPost,
    getPosts,
    getUserPosts,
    deletePost,
    updatePost,
} from "../controllers/postsController.js";
import auth from "../middleswares/auth.js";

const router = express.Router();

// get all posts route
router.get("/", getPosts);

// get user posts route
router.get("/user", auth, getUserPosts);

// add new post route
router.post("/", auth, addPost);

// delete post route
router.delete("/:id", auth, deletePost);

// update post route
//put replaces whole object, patch would just change specific property
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
