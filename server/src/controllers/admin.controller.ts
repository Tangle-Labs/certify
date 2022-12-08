import { IdentityService } from "@/services";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Types } from "@tanglelabs/identity-manager";
import { IDENTITY_DB_URI } from "@/config";

export const setupOrganization = async (req: Request, res: Response) => {
	const { orgName, password, orgEmail } = req.body;
	const did = await IdentityService.newDid({
		alias: orgName,
		store: {
			type: Types.Mongo,

			options: {
				mongouri: IDENTITY_DB_URI
			}
		}
	});
	console.log(did);
	res.json(did);
};
