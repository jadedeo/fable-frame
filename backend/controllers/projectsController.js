import mongoose from "mongoose";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import Character from "../models/CharacterModel.js";

/** GET ALL USER PROJECTS */
const getUserProjects = async (req, res) => {
    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        // can use find () with params, like find(title: "hello") to only get projects that match criteria
        const userProjects = await Project.find({ user: user._id }).sort({
            createdAt: "desc",
        });
        res.status(200).json({ userProjects, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
    // console.log(req.params);
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
const createProject = async (req, res) => {
    // grab data from request body
    const { projectData } = req.body;

    // res.json(req.user);

    // validation: check fields are not empty
    if (!projectData.name) {
        return res.status(400).json({ error: "Project name is required" });
    }

    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    try {
        const project = await Project.create({
            user: user._id,
            ...projectData,
        });
        res.status(200).json({ success: "Project created", project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** UPDATE PROJECT */
// Backend: expects direct fields from req.body, not req.body.projectData
const updateProject = async (req, res) => {
    const { name, description, tags } = req.body;
    const { projectId } = req.params;

    // Validation
    if (!name) {
        return res.status(400).json({ error: "Project name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    const user = await User.findById(req.user._id);
    if (!project.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        const updatedProject = await project.updateOne(
            { name, description, tags },
            { new: true }
        );
        res.status(200).json({
            success: "Project updated",
            project: updatedProject,
        });
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
    // console.log(project.user);
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
    createProject,
    updateProject,
    deleteProject,
};
