import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CredentialsService } from "@/services";

export const createCredential = asyncHandler(async (req: Request, res: Response) => {
	const credential = await CredentialsService.create({ ...req.body });
	res.status(201).json(credential);
});

export const getAllCredentials = asyncHandler(async (req: Request, res: Response) => {
	const credentials = await CredentialsService.findMany({ ...req.query });
	res.json(credentials);
});

export const getCredentialById = asyncHandler(async (req: Request, res: Response) => {
	const credential = await CredentialsService.findById(req.params.id);
	res.json(credential);
});
