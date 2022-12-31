import { createNewApplication, getAllUserApplications } from "@/controllers";
import { isAuthenticated, useDto } from "@/middleware";
import { CreateApplicationDto } from "@/validators";
import { Router } from "express";

const router = Router();

router
	.route("/")
	.post(isAuthenticated, useDto(CreateApplicationDto), createNewApplication)
	.get(isAuthenticated, getAllUserApplications);

export default router;
