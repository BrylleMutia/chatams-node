import express from "express";
import { ask } from "../controllers/chat.js";

const router = express.Router();

router.post("/ask/:userId/:category", [], ask);

export { router as chatRouter };
