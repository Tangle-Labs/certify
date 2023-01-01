import { getOrganizationProfile, updateOrganizationProfile } from "@/controllers";
import { hasPermission, isAuthenticated, isStaff, useDto } from "@/middleware";
import { UpdateOrganizationDto } from "@/validators";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * "/api/organization":
 *   patch:
 *     tags:
 *       - Organization
 *     summary: Update the Organization's details
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateOrganizationDto"
 *     responses:
 *       201:
 *         description: Success, updated the organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/OrganizationResponse"
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Organization
 *     summary: get details of the organization
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success, returns the organization details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/OrganizationResponse"
 *       401:
 *         description: Unauthorized, happens when the user is not signed in
 *       500:
 *         description: Internal server error occurred
 *
 */

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
