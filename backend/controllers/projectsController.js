import mongoose from "mongoose";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import Character from "../models/CharacterModel.js";

/** GET ALL USER PROJECTS */
const getUserProjects = async (req, res) => {
    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        // can use find () with params, like find(title: "hello") to only get posts that match criteria
        const userProjects = await Project.find({ user: user._id }).sort({
            createdAt: "desc",
        });
        res.status(200).json({ userProjects, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
    console.log(req.params);
    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check project exists
    const project = await Project.findById(req.params.projectId);
    if (!project) {
        return res.status(400).json({ error: "Project not found" });
    }

    // check user owns character
    const user = await User.findById(req.user._id);

    if (!project.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        const project = await Project.findById(req.params.projectId);
        res.status(200).json({ project, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** ADD PROJECT */
const addProject = async (req, res) => {
    // grab data from request body
    const { name } = req.body;

    // res.json(req.user);

    // validation: check fields are not empty
    if (!name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        const project = await Project.create({
            user: user._id,
            name,
            characters: [],
        });
        res.status(200).json({ success: "Project created", project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** UPDATE PROJECT */
const updateProject = async (req, res) => {
    // grab data from request body
    const { name } = req.body;

    // validation: check fields are not empty
    if (!name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check character exists
    const project = await Project.findById(req.params.projectId);
    if (!project) {
        return res.status(400).json({ error: "Project not found" });
    }

    // check user owns character
    const user = await User.findById(req.user._id);
    if (!project.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        await project.updateOne({ name });
        res.status(200).json({ success: "Project updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** DELETE PROJECT */
//could also set up mongo middleware hook (pre('remove')) on the Project model to automate cascading deletes instead
const deleteProject = async (req, res) => {
    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check project exists
    const project = await Project.findById(req.params.projectId);
    if (!project) {
        return res.status(400).json({ error: "Project not found" });
    }

    // check user owns post
    const user = await User.findById(req.user._id);
    console.log(project.user);
    if (!project.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        // Delete all characters for this project
        await Character.deleteMany({ project: req.params.projectId });

        await project.deleteOne();
        res.status(200).json({ success: "Project deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/********************************************** */

/** GET PROJECT SETTINGS */

/** ADD SETTING */

/** EDIT SETTING */

/** REMOVE SETTING */

export {
    getUserProjects,
    getProject,
    addProject,
    updateProject,
    deleteProject,
};
