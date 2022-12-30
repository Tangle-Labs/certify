import { createNewApplication } from "@/controllers";
import { isAuthenticated, useDto } from "@/middleware";
import { CreateApplicationDto } from "@/validators";
import { Router } from "express";

const router = Router();

router.route("/").post(isAuthenticated, useDto(CreateApplicationDto), createNewApplication);

export default router;
