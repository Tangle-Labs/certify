import { createStaffUser, disableStaffUser, editStaffUser, getAllStaffUsers } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateStaffDto, UpdateStaffDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/staff":
 *   post:
 *     tags:
 *       - Staff
 *     summary: create a new staff user
 *     responses:
 *       201:
 *         description: Success, creates a new staff user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
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
 *
 * "/api/staff/{id}":
 *   patch:
 *     tags:
 *       - Staff
 *     summary: Edit a specific staff user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/CreateStaffDto"
 *     responses:
 *       202:
 *         description: Success, updated the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 *
 *   delete:
 *     tags:
 *       - Staff
 *     summary: Ban a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Success user banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
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
