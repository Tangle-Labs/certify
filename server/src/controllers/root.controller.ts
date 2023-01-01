import { version, name } from "../../package.json";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getInfo = asyncHandler(async (req: Request, res: Response) => {
	res.json({
		version,
		name
	});
});
