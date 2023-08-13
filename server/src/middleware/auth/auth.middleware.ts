import { RolesService, SessionsService, UsersService } from "@/services";
import { createJsonWebToken, validateJsonWebToken } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const userDeserializer = async (req: Request, res: Response, next: NextFunction) => {
	const { accessToken } = req.cookies;
	let { refreshToken } = req.cookies;

	if (!accessToken && !refreshToken) {
		const session = await SessionsService.create({ isValid: false });
		refreshToken = createJsonWebToken({ sessionId: session.id }, "1y");
		res.cookie("refreshToken", refreshToken, {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true
		});
		req.session = session;
	}

	const { payload, expired } = validateJsonWebToken(accessToken);

	if (payload) {
		req.session = await SessionsService.findById(payload.id);
		req.user = await UsersService.findById(payload.userId, [RolesService.model]);
		return next();
	}

	const { payload: refresh } =
		!expired && refreshToken ? validateJsonWebToken(refreshToken) : { payload: null };

	if (!refresh) return next();
	const session = await SessionsService.findOne({ id: refresh.sessionId });

	req.session = session;
	if (!session.isValid) return next();

	const token = createJsonWebToken({ userId: session.userId, id: session.id });

	res.cookie("accessToken", token, {
		maxAge: 60 * 60 * 1000,
		httpOnly: true
	});

	const tokenPayload = validateJsonWebToken(token).payload;
	req.user = await UsersService.findById(session.userId);

	return next();
};
