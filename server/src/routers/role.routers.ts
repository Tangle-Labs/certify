import { createNewRole, getAllRoles } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateRoleDto } from "@/validators";
import { Router } from "express";

const router = Router();

router
	.route("/")
	.post(
		isAuthenticated,
		isStaff,
		hasPermission("manageRoles"),
		useDto(CreateRoleDto),
		createNewRole
	)
	.get(isAuthenticated, isStaff, getAllRoles);

export default router;
