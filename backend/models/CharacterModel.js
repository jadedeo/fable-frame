import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        aliases: {
            type: Array,
        },
        age: {
            type: Number,
        },
        status: {
            type: String,
        },
        role: {
            type: Array,
        },
        goal: {
            type: String,
        },
        physicalDescription: {
            age: { type: Number },
            gender: { type: String },
            eyeColor: { type: String },
            hairColor: { type: String },
            height: { type: String },
        },
        personality: {
            type: Array,
        },
        habitsMannerisms: {
            type: String,
        },
        skills: {
            type: Array,
        },
        biography: {
            type: Array,
        },
        relationships: {
            type: Array,
        },
    },
    { timestamps: true }
);

//create character model
const Character = mongoose.model("Character", CharacterSchema);

export default Character;
