import { createNewRole, getAllRoles, updateRole } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateRoleDto, UpdateRoteDto } from "@/validators";
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

router
	.route("/:id")
	.patch(isAuthenticated, isStaff, hasPermission("manageRoles"), useDto(UpdateRoteDto), updateRole);

export default router;
