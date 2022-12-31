import { createStaffUser, getAllStaffUsers } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateUserDto } from "@/validators";
import { Router } from "express";

const router = Router();

router
	.route("/")
	.post(
		isAuthenticated,
		isStaff,
		hasPermission("manageStaff"),
		useDto(CreateUserDto),
		createStaffUser
	)
	.get(isAuthenticated, isStaff, hasPermission("manageStaff"), getAllStaffUsers);

export default router;
