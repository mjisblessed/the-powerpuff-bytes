import express from "express";
import getResponse from "./geminicontroller.js";

const router = express.Router();

router.post("/gemini", getResponse);

export default router;