import { createNewRole, getAllRoles, updateRole } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { CreateRoleDto, UpdateRoteDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/roles":
 *   post:
 *     tags:
 *       - Roles
 *     summary: create a new role
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateRoleDto"
 *     responses:
 *       201:
 *         description: Success, creates a new role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Roles
 *     summary: get all the roles
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns array of all the roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/RoleResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 * "/api/roles/{id}":
 *   patch:
 *     tags:
 *       - Roles
 *     summary: Edit a specific role
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
 *              $ref: "#/components/schemas/UpdateRoleDto"
 *     responses:
 *       202:
 *         description: Success, updated the role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RoleResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 *
 */

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
