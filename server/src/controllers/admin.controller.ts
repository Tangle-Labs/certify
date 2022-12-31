import { ApplicationsService, CredentialsService, IdentityService, UsersService } from "@/services";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Types } from "@tanglelabs/identity-manager";
import { IDENTITY_DB_URI, IDENTITY_PATH } from "@/config";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const configPath = path.resolve(IDENTITY_PATH, "is-config.json");

const createSettingsJson = async (settings: Record<string, unknown>) => {
	await writeFile(configPath, JSON.stringify(settings));
};

const getSettingsJson = async () => {
	const buffer = await readFile(configPath);
	return JSON.parse(buffer.toString());
};

export const getAllApplications = asyncHandler(async (req: Request, res: Response) => {
	const applications = await ApplicationsService.findMany({}, [
		UsersService.model,
		CredentialsService.model
	]);
	res.json(applications);
});

export const setupOrganization = asyncHandler(async (req: Request, res: Response) => {
	await getSettingsJson()
		.then(() => {
			throw new Error("400::Config already exists");
		})
		.catch(async (e) => {
			if (e.code !== "ENOENT") throw new Error("400::Config already exists");
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

			await did.attachSigningMethod("#signing-method");
			await did.attachEncryptionMethod();

			const user = await UsersService.create({
				name: orgName,
				email: orgEmail,
				password,
				isSuperUser: true
			});
			await createSettingsJson({ owner: user.id, did: did.getDid().toString() });

			res.json({ user, did: did.getDocument() });
		});
});
