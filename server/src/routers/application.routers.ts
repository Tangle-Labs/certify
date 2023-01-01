import { createNewApplication, getAllUserApplications } from "@/controllers";
import { isAuthenticated, useDto } from "@/middleware";
import { CreateApplicationDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/applications":
 *   post:
 *     tags:
 *       - Applications
 *     summary: create a new application
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateApplicationDto"
 *     responses:
 *       201:
 *         description: Success, create a new application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApplicationResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Applications
 *     summary: get all the applications made by the current user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns array of all the applications of the currently signed in users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ApplicationResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 * "/api/admin/applications":
 *   get:
 *     tags:
 *       - Applications
 *     summary: get all the applications
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns array of all the applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ApplicationResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 * "/api/admin/applications/{id}":
 *   get:
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     summary: get an application by ID
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns the specific application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApplicationResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 *
 *
 */

router
	.route("/")
	.post(isAuthenticated, useDto(CreateApplicationDto), createNewApplication)
	.get(isAuthenticated, getAllUserApplications);

export default router;
