import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { IdentityService, SessionsService, SiopOfferService, UsersService } from "@/services";
import { PUBLIC_BASE_URI } from "@/config";

export const newSiopRequest = asyncHandler(async (req: Request, res: Response) => {
	const siopRequest = await IdentityService.rp.createRequest({
		state: req.session.id,
		requestBy: "reference",
		requestUri: new URL(`/api/oid4vc/siop/${req.session.id}`, PUBLIC_BASE_URI).toString(),
		responseType: "id_token"
	});
	const offerExists = await SiopOfferService.findById(req.session.id);
	if (offerExists) {
		await SiopOfferService.findByIdAndUpdate(req.session.id, { request: siopRequest.request });
	} else {
		await SiopOfferService.create({ id: req.session.id, request: siopRequest.request });
	}
	res.json(siopRequest);
});

export const getSiopRequestById = asyncHandler(async (req: Request, res: Response) => {
	const { request } = await SiopOfferService.findById(req.params.id);
	res.send(request);
});

export const verifyAuthResponse = asyncHandler(async (req: Request, res: Response) => {
	await IdentityService.rp.verifyAuthResponse(req.body);
	const { id_token: idToken } = req.body;
	const { state } = req.body;
	const { iss } = await IdentityService.rp.validateJwt(idToken);
	let user = await UsersService.findOne({ did: iss });
	if (!user) user = await UsersService.create({ did: iss });
	await SessionsService.findByIdAndUpdate(state, { isValid: true, did: iss, userId: user.id });
	res.status(204).send();
});
