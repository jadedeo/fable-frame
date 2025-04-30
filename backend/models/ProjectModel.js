import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

//create project model
const Project = mongoose.model("Project", ProjectSchema);

export default Project;
