import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { OrganizationService } from "@/services/organization.service";

export const getOrganizationProfile = asyncHandler(async (req: Request, res: Response) => {
	const config = await OrganizationService.loadConfig();
	res.json(config);
});

export const updateOrganizationProfile = asyncHandler(async (req: Request, res: Response) => {
	const config = await OrganizationService.saveConfig({ ...req.body });
	res.status(202).json(config);
});
