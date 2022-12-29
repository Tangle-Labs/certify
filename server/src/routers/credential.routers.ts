import { createCredential } from "@/controllers";
import { isAuthenticated, useDto } from "@/middleware";
import { CreateCredentialDto } from "@/validators";
import { Router } from "express";

const router = Router();

router.route("/").post(isAuthenticated, useDto(CreateCredentialDto), createCredential);

export default router;
