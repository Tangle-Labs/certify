import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { RolesService, UsersService } from "@/services";

export const getAllStaffUsers = asyncHandler(async (req: Request, res: Response) => {
	const staff = await UsersService.findMany({ isSuperUser: true }, [RolesService.model]);
	res.json(staff);
});

export const createStaffUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await UsersService.create({ ...req.body, isSuperUser: true });
	res.json(user);
});
