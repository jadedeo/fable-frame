import mongoose from "mongoose";
import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import Character from "../models/CharacterModel.js";

/** GET PROJECT CHARACTERS */
const getProjectCharacters = async (req, res) => {
    // grab authenticated user from request body
    const user = await User.findById(req.user._id);
    const { projectId } = req.params;

    try {
        // can use find () with params, like find(title: "hello") to only get posts that match criteria
        const projectCharacters = await Character.find({
            user: user._id,
            project: projectId,
        }).sort({
            createdAt: "desc",
        });
        res.status(200).json({ projectCharacters, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** Get specific character */
const getCharacter = async (req, res) => {
    console.log(req.params);
    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.characterId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check character exists
    const character = await Character.findById(req.params.characterId);
    if (!character) {
        return res.status(400).json({ error: "Character not found" });
    }

    // check user owns character
    const user = await User.findById(req.user._id);
    // console.log(character.user);

    if (!character.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        const character = await Character.findById(req.params.characterId);
        res.status(200).json({ character, email: user.email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** ADD CHARACTER */
const addCharacter = async (req, res) => {
    // grab authenticated user from request body
    const user = await User.findById(req.user._id);

    // grab data from request body
    const { projectId } = req.params;
    const { characterData } = req.body;

    // res.json(req.user);

    // validation: check fields are not empty
    if (!characterData.name) {
        return res.status(400).json({ error: "Character name is required" });
    }

    try {
        const character = await Character.create({
            user: user._id,
            project: projectId,
            ...characterData,
        });
        res.status(200).json({ success: "Character created", character });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** EDIT CHARACTER */
const updateCharacter = async (req, res) => {
    // grab data from request body
    const { characterData } = req.body;

    console.log(characterData);

    // validation: check fields are not empty
    if (!characterData.name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.characterId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check character exists
    const character = await Character.findById(req.params.characterId);
    if (!character) {
        return res.status(400).json({ error: "Character not found" });
    }

    // check user owns character
    const user = await User.findById(req.user._id);
    if (!character.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        await character.updateOne(characterData);
        const updated = await Character.findById(req.params.characterId);
        res.status(200).json({
            success: "Character updated",
            character: updated,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** DELETE CHARACTER */
const deleteCharacter = async (req, res) => {
    // check id is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.characterId)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }

    // check character exists
    const character = await Character.findById(req.params.characterId);
    if (!character) {
        return res.status(400).json({ error: "Character not found" });
    }

    // check user owns character
    const user = await User.findById(req.user._id);
    console.log(character.user);
    if (!character.user.equals(user._id)) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        await character.deleteOne();
        res.status(200).json({ success: "Character deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    getProjectCharacters,
    getCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,
};
