import express from "express";
import {
    getUserProjects,
    addProject,
    updateProject,
    deleteProject,
} from "../controllers/projectsController.js";

import {
    getProjectCharacters,
    getCharacter,
    addCharacter,
    updateCharacter,
    deleteCharacter,
} from "../controllers/charactersController.js";

import auth from "../middleswares/auth.js";

const router = express.Router();

/*************************************** GENERAL PROJECT ROUTES */
// get user projects route
router.get("/", auth, getUserProjects);

// add project
router.post("/", auth, addProject);

// update project
router.put("/:projectId", auth, updateProject);

// delete project
router.delete("/:projectId", auth, deleteProject);

/*************************************** PROJECT CHARACTER ROUTES */
// get project characters route
router.get("/:projectId/characters", auth, getProjectCharacters);

// get character route
router.get("/:projectId/characters/:characterId", auth, getCharacter);

// add character
router.post("/:projectId/characters", auth, addCharacter);

//update character
router.put("/:projectId/characters/:characterId", auth, updateCharacter);

//update character
router.delete("/:projectId/characters/:characterId", auth, deleteCharacter);

export { router as projectsRoutes };
