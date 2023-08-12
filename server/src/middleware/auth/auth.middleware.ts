import { RolesService, SessionsService, UsersService } from "@/services";
import { createJsonWebToken, validateJsonWebToken } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const userDeserializer = async (req: Request, res: Response, next: NextFunction) => {
	const { accessToken } = req.cookies;
	let { refreshToken } = req.cookies;

	if (!accessToken && !refreshToken) {
		const session = await SessionsService.create({ isValid: false });
		refreshToken = createJsonWebToken({ sessionId: session.id }, "1y");
		res.cookie("accessToken", refreshToken, {
			maxAge: 365 * 24 * 60 * 60 * 1000,
			httpOnly: true
		});
	}

	const { payload, expired } = validateJsonWebToken(accessToken);

	if (payload) {
		req.session = payload;
		req.user = await UsersService.findById(payload.userId, [RolesService.model]);
		return next();
	}

	const { payload: refresh } =
		!expired && refreshToken ? validateJsonWebToken(refreshToken) : { payload: null };
	if (!refresh) return next();
	const { id, userId, isValid } = await SessionsService.findOne({ id: refresh.sessionId });
	if (!isValid) return next();
	if (!userId) return next();

	const token = createJsonWebToken({ userId, id });

	res.cookie("accessToken", token, {
		maxAge: 60 * 60 * 1000,
		httpOnly: true
	});

	req.session = validateJsonWebToken(token).payload;
	req.user = await UsersService.findById(userId);

	return next();
};
