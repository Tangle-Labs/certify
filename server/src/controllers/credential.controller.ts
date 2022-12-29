import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Credential } from "@/models";

export const createCredential = asyncHandler(async (req: Request, res: Response) => {
	const credential = await Credential.create({ ...req.body });
	res.status(201).json(credential);
});
