import { getAllApplications, modifyApplicationStatus, setupOrganization } from "@/controllers";
import { isAuthenticated, isStaff, useDto } from "@/middleware";
import { ModifyAdminApplicationDto } from "@/validators";
import { Router } from "express";

const router = Router();

router.route("/setup").post(setupOrganization);
router.route("/applications").get(isAuthenticated, isStaff, getAllApplications);
router
	.route("/applications/:id")
	.patch(isAuthenticated, isStaff, useDto(ModifyAdminApplicationDto), modifyApplicationStatus);

export default router;
