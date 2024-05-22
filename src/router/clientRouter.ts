import express from "express";
import { getUsersInClient } from "../controllers/client.js";

const router = express.Router();

router.get("/users", [], getUsersInClient);

export { router as clientRouter };
