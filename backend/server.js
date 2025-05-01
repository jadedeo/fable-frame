import express from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { projectsRoutes } from "./routes/projectsRoutes.js";
import mongoose from "mongoose";

import path from "path";
import { fileURLToPath } from "url";
// import { log } from "console";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);

const app = express();

// create server with express
app.use(express.json());

// general process
//    step 1: endpoint
//    step 2: db model
//    step 2: controller to handle router

//declare routes for api
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/uploads", express.static("uploads"));

// // use client app
// app.use(express.static(path.join(__dirname, "/client/dist")));

// //render clinet for any path
// app.get("/{*any}", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/dist/index.html"));
// });

// use mongoose pkg to connect to mongodb db
// atlas connection is basically same, but different string
// more info instead of just accepting connection string

//process.env.DB_URI
mongoose
    .connect("mongodb://localhost:27017", { dbName: "fable_frame_db" })
    .then(() => {
        console.log("connected to db successfully");
        app.listen(4000, "localhost", () =>
            console.log("Listening on port 4000")
        );
    })
    .catch((err) => console.log(err));
