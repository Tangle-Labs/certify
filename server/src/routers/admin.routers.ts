import {
	getAdminStats,
	getAllApplications,
	modifyApplicationStatus,
	setupOrganization
} from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { ModifyAdminApplicationDto } from "@/validators";
import { Router } from "express";

const router = Router();

router.route("/setup").post(setupOrganization);
router
	.route("/applications")
	.get(isAuthenticated, isStaff, hasPermission("manageApplications"), getAllApplications);
router.route("/stats").get(isAuthenticated, isStaff, getAdminStats);
router
	.route("/applications/:id")
	.patch(
		isAuthenticated,
		isStaff,
		useDto(ModifyAdminApplicationDto),
		hasPermission("manageApplications"),
		modifyApplicationStatus
	);

export default router;
