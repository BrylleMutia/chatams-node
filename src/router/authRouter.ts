import express from "express";
import {
   register,
   deleteUser,
   getUserDetails,
   login,
   toggleApprovals,
   getAllUsers,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", [], register);
router.post("/login", [], login);
router.post("/approvals", [], toggleApprovals);
router.get("/user/:id", [], getUserDetails);
router.get("/users", [], getAllUsers);
router.delete("/user/:id", [], deleteUser);

export { router as authRouter };
