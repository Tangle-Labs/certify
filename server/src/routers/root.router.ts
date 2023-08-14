import { getDashboardStats, getInfo } from "@/controllers";
import { isAuthenticated } from "@/middleware";
import { Router } from "express";

const router = Router();

router.route("/info").get(getInfo);
router.route("/stats").get(isAuthenticated, getDashboardStats);

export default router;
