import { ApplicationsService } from "@/services";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getInfo = asyncHandler(async (req: Request, res: Response) => {
	res.json({
		version: "v0.1.0",
		name: "Certify"
	});
});

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
	const applicationStats = {
		approved: 0,
		pending: 0,
		rejected: 0
	};
	const applications = await ApplicationsService.findMany({ userId: req.user.id });
	applications.forEach((a) => applicationStats[a.status]++);
	res.json(applicationStats);
});
