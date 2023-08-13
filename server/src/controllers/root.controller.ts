import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getInfo = asyncHandler(async (req: Request, res: Response) => {
	res.json({
		version: "v0.1.0",
		name: "Certify"
	});
});
