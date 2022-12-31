import { createStaffUser, editStaffUser, getAllStaffUsers } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateUserDto, UpdateStaffDto } from "@/validators";
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

router
	.route("/:id")
	.patch(
		isAuthenticated,
		isStaff,
		hasPermission("manageStaff"),
		useDto(UpdateStaffDto),
		editStaffUser
	);

export default router;
