import { createCredential } from "@/controllers";
import { useDto } from "@/middleware";
import { CreateCredentialDto } from "@/validators";
import { Router } from "express";

const router = Router();

router.route("/").post(useDto(CreateCredentialDto), createCredential);

export default router;
