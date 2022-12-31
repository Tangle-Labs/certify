import { getAllApplications, setupOrganization } from "@/controllers";
import { isAuthenticated, isStaff } from "@/middleware";
import { Router } from "express";

const router = Router();

router.route("/setup").post(setupOrganization);
router.route("/applications").get(isAuthenticated, isStaff, getAllApplications);

export default router;
