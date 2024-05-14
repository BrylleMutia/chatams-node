import express from "express";
import { register, deleteUser, getUserDetails } from "../controllers/auth.js";

const router = express.Router();

router.get("/user/:id", [], getUserDetails)
router.post("/register", [], register);
router.delete("/user/:id", [], deleteUser);

export { router as authRouter };