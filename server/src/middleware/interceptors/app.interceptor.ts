import { FILTER_KEYS } from "@/config";
import { sanitizeObject } from "@/utils";
import { NextFunction, Request, Response } from "express";

export function AppInterceptor(req: Request, res: Response, next: NextFunction) {
	const transmitJson = res.json;
	res.json = function (body) {
		const sanitizedBody = sanitizeObject(
			body,
			FILTER_KEYS.split(",").map((k) => k.trim())
		);
		return transmitJson.call(this, sanitizedBody);
	};
	next();
}
