import { createCredential, getAllCredentials, getCredentialById } from "@/controllers";
import { hasPermission, isAuthenticated, useDto } from "@/middleware";
import { CreateCredentialDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/credentials":
 *   post:
 *     tags:
 *       - Credentials
 *     summary: create a new Credential
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateCredentialDto"
 *     responses:
 *       201:
 *         description: Success, creates a new credential
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CredentialResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Credentials
 *     summary: get all the credentials
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns array of all the credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CredentialResposne"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 * "/api/credentials/{id}":
 *   get:
 *     tags:
 *       - Credentials
 *     summary: Edit a specific role
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Success, updated the role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CredentialResponse"
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
		useDto(CreateCredentialDto),
		hasPermission("manageCredentials"),
		createCredential
	)
	.get(isAuthenticated, getAllCredentials);

router.route("/:id").get(isAuthenticated, getCredentialById);

export default router;
