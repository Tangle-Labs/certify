import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import {
	ApplicationsService,
	CredOfferService,
	CredentialsService,
	IdentityService,
	SessionsService,
	SiopOfferService,
	UsersService
} from "@/services";
import { PUBLIC_BASE_URI } from "@/config";
import { wsServer } from "@/server";
import * as didJWT from "did-jwt";
import { resolver } from "@/utils";

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

export const sendMetadata = asyncHandler(async (req: Request, res: Response) => {
	res.json(IdentityService.issuer.getIssuerMetadata());
});

export const createCredentialOffer = asyncHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const application = await ApplicationsService.findById(req.params.id, [CredentialsService.model]);

	const offer = await IdentityService.issuer.createCredentialOffer(
		{
			// @ts-ignore
			credentials: [application.Credential.name],
			requestBy: "reference",
			credentialOfferUri: new URL(`/api/oid4vc/offers/${id}`, PUBLIC_BASE_URI).toString()
		},
		{
			applicationId: application.id
		}
	);

	const offerExists = await CredOfferService.findById(id);
	if (!offerExists) {
		await CredOfferService.create({ id, offer: offer.offer }).catch(() => null);
	} else {
		await CredOfferService.findByIdAndUpdate(id, { offer: offer.offer });
	}
	res.json(offer);
});

export const sendCredential = asyncHandler(async (req: Request, res: Response) => {
	const token = req.headers.authorization?.split("Bearer ")[1];
	if (!token) throw new Error("401::missing token");
	const { payload } = await didJWT.verifyJWT(token, {
		policies: { aud: false },
		resolver
	});
	const did = await IdentityService.issuer.validateCredentialsResponse({
		token,
		proof: req.body.proof.jwt
	});
	const application = await ApplicationsService.findById(payload.applicationId);
	const response = await IdentityService.issuer.createSendCredentialsResponse({
		credentials: [application.vc.cred]
	});
	res.json(response);
});

export const getSiopRequestById = asyncHandler(async (req: Request, res: Response) => {
	const { request } = await SiopOfferService.findById(req.params.id);
	res.send(request);
});

export const getCredOffer = asyncHandler(async (req: Request, res: Response) => {
	const { offer } = await CredOfferService.findById(req.params.id);
	res.json(offer);
});

export const tokenEndpoint = asyncHandler(async (req: Request, res: Response) => {
	const response = await IdentityService.issuer.createTokenResponse(req.body);
	res.json(response);
});

export const verifyAuthResponse = asyncHandler(async (req: Request, res: Response) => {
	await IdentityService.rp.verifyAuthResponse(req.body);
	const { id_token: idToken } = req.body;
	const { state } = req.body;
	const { iss } = await IdentityService.rp.validateJwt(idToken);
	let user = await UsersService.findOne({ did: iss });
	if (!user) user = await UsersService.create({ did: iss });
	await SessionsService.findByIdAndUpdate(state, { isValid: true, did: iss, userId: user.id });
	wsServer.broadcast(state, { login: true });
	res.status(204).send();
});
