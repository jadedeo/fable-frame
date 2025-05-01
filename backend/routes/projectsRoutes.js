import express from "express";
import multer from "multer";
import {
    getUserProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectsController.js";

import {
    getProjectCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} from "../controllers/charactersController.js";

import auth from "../middleswares/auth.js";
import upload from "../middleswares/upload.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

/*************************************** GENERAL PROJECT ROUTES */
// get user projects route
router.get("/", auth, getUserProjects);

// get project
router.get("/:projectId", auth, getProject);

// add project
router.post("/", auth, createProject);

// update project
router.put("/:projectId", auth, updateProject);

// delete project
router.delete("/:projectId", auth, deleteProject);

/*************************************** PROJECT CHARACTER ROUTES */
// get project characters route
router.get("/:projectId/characters", auth, getProjectCharacters);

// get character route
router.get("/:projectId/characters/:characterId", auth, getCharacter);

// // add character
// router.post("/:projectId/characters", auth, createCharacter);

// //update character
// router.put("/:projectId/characters/:characterId", auth, updateCharacter);

// RESTful and matches the rest of your API structure
router.post(
    "/:projectId/characters",
    auth,
    upload.single("image"),
    createCharacter
);
router.put(
    "/:projectId/characters/:characterId",
    auth,
    upload.single("image"),
    updateCharacter
);

//update character
router.delete("/:projectId/characters/:characterId", auth, deleteCharacter);

export { router as projectsRoutes };
