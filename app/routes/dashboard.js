import express from "express";
import { getDashboardStats } from "../controller/dashboard.js";
import authMiddleware from "../middleWare/authMiddleware.js";

const router = express.Router();

router.get("/stats",authMiddleware, getDashboardStats);

export default router;
