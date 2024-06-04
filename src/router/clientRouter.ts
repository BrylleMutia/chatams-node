import express from "express";
import { addNewClient, getAllClientDetails, getClientDetails, getUsersInClient } from "../controllers/client.js";

const router = express.Router();

router.get("/", getAllClientDetails)
router.get("/:clientId", getClientDetails)
router.get("/:clientId/users", [], getUsersInClient);
router.post("/add", [], addNewClient);

export { router as clientRouter };
