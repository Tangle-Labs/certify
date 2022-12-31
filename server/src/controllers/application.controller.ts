import { ApplicationsService, CredentialsService } from "@/services";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const createNewApplication = asyncHandler(async (req: Request, res: Response) => {
	const application = await ApplicationsService.create({ ...req.body, userId: req.user.id });
	res.json(application);
});

export const getAllUserApplications = asyncHandler(async (req: Request, res: Response) => {
	const applications = await ApplicationsService.findMany({ userId: req.user.id }, [
		CredentialsService.model
	]);
	res.json(applications);
});
