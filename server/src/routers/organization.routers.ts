import { getOrganizationProfile, updateOrganizationProfile } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { UpdateOrganizationDto } from "@/validators";
import { Router } from "express";

const router = Router();

router
	.route("/")
	.get(isAuthenticated, isStaff, hasPermission("manageOrganization"), getOrganizationProfile)
	.patch(
		isAuthenticated,
		isStaff,
		hasPermission("manageOrganization"),
		useDto(UpdateOrganizationDto),
		updateOrganizationProfile
	);

export default router;
