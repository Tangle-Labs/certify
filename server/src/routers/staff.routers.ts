import { createStaffUser, disableStaffUser, editStaffUser, getAllStaffUsers } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateStaffDto, UpdateStaffDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/staff":
 *
 *   get:
 *     tags:
 *       - Staff
 *     summary: get all the staff users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns array of all the staff users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 */

router
	.route("/")
	.post(
		isAuthenticated,
		isStaff,
		hasPermission("manageStaff"),
		useDto(CreateStaffDto),
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
	)
	.delete(isAuthenticated, isStaff, hasPermission("manageStaff"), disableStaffUser);

export default router;
