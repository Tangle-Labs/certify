import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { IdentityService, SiopOfferService } from "@/services";
import { PUBLIC_BASE_URI } from "@/config";
import { nanoid } from "nanoid";

export const newSiopRequest = asyncHandler(async (req: Request, res: Response) => {
	const id = nanoid();
	const siopRequest = await IdentityService.rp.createRequest({
		state: req.session.id,
		requestBy: "reference",
		requestUri: new URL(`/api/oid4vc/siop/${id}`, PUBLIC_BASE_URI).toString(),
		responseType: "id_token"
	});
	await SiopOfferService.create({ id, request: siopRequest.request });
	res.json({ siopRequest });
});

export const getSiopRequestById = asyncHandler(async (req: Request, res: Response) => {
	const { request } = await SiopOfferService.findById(req.params.id);
	res.send(request);
});
