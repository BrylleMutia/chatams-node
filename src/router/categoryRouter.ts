import express from "express";
import {
   addNewCategory,
   getCategoriesInClient,
} from "../controllers/category.js";

const router = express.Router();

router.post("/:clientId", [], addNewCategory);
router.get("/:clientId", [], getCategoriesInClient);

export { router as categoryRouter };
