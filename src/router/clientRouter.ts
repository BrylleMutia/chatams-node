import express from "express";
import { addNewClient, getUsersInClient } from "../controllers/client.js";

const router = express.Router();

router.get("/users", [], getUsersInClient);
router.post("/add", [], addNewClient);

export { router as clientRouter };
