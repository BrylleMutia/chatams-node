import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/fileUpload.js";

const upload = multer({ dest: "../docs_temp" });

const router = express.Router();
router.post("/file/upload", upload.array("docs"), uploadFile);
