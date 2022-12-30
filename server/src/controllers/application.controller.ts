import { ApplicationsService } from "@/services";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const createNewApplication = asyncHandler(async (req: Request, res: Response) => {
	const application = await ApplicationsService.create({ ...req.body });
	res.json(application);
});
