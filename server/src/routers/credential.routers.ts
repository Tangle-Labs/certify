import { createCredential, getAllCredentials, getCredentialById } from "@/controllers";
import { hasPermission, isAuthenticated, useDto } from "@/middleware";
import { CreateCredentialDto } from "@/validators";
import { Router } from "express";

const router = Router();

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
