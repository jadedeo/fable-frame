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
            required: false,
        },
        aliases: {
            type: Array,
            required: false,
        },
        age: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            required: false,
        },
        role: {
            type: Array,
            required: false,
        },
        goal: {
            type: String,
            required: false,
        },
        physicalDescription: {
            type: Array,
            required: false,
        },
        personality: {
            type: Array,
            required: false,
        },
        habitsMannerisms: {
            type: String,
            required: false,
        },
        skills: {
            type: Array,
            required: false,
        },
        biography: {
            type: Array,
            required: false,
        },
        relationships: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

//create character model
const Character = mongoose.model("Character", CharacterSchema);

export default Character;
