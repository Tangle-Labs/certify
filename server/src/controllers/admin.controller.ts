import { IdentityService, UsersService } from "@/services";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Types } from "@tanglelabs/identity-manager";
import { IDENTITY_DB_URI } from "@/config";

export const setupOrganization = asyncHandler(async (req: Request, res: Response) => {
	const { orgName, password, orgEmail } = req.body;
	const user = await UsersService.create({
		name: orgName,
		email: orgEmail,
		password,
		isSuperUser: true
	});
	const did = await IdentityService.newDid({
		alias: orgName,
		store: {
			type: Types.Mongo,

			options: {
				mongouri: IDENTITY_DB_URI
			}
		}
	});
	await did.attachSigningMethod("#signing-method");
	await did.attachEncryptionMethod();
	console.log(did.getDocument());
	res.json(did.getDocument());
});
