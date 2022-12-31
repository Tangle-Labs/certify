import { createCredential, getAllCredentials, getCredentialById } from "@/controllers";
import { isAuthenticated, useDto } from "@/middleware";
import { CreateCredentialDto } from "@/validators";
import { Router } from "express";

const router = Router();

router
	.route("/")
	.post(isAuthenticated, useDto(CreateCredentialDto), createCredential)
	.get(isAuthenticated, getAllCredentials);

router.route("/:id").get(isAuthenticated, getCredentialById);

export default router;
