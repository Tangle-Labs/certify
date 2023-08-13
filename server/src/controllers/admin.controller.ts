import {
	ApplicationsService,
	CredentialsService,
	IdentityService,
	UsersService,
	constructFileStore
} from "@/services";
import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { IDENTITY_PATH, IDENTITY_SECRET } from "@/config";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const configPath = path.resolve(IDENTITY_PATH as string, "is-config.json");

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

export const getAdminStats = asyncHandler(async (req: Request, res: Response) => {
	const applications = await ApplicationsService.model.count();
	const credentials = await CredentialsService.model.count();
	const users = await UsersService.model.count();

	res.json({
		credentials,
		users,
		applications
	});
});

export const modifyApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
	const status = req.body.approve ? "approved" : "rejected";
	let verifiableCredential = {};
	if (req.body.approve) {
		const adminDid = await IdentityService.getAdminDid();
		const application = await ApplicationsService.findById(req.params.id, [
			CredentialsService.model,
			UsersService.model
		]);
		const count = await ApplicationsService.model.count();
		verifiableCredential = await adminDid.credentials.create({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			recipientDid: application.User.did,
			body: application.body,
			id: `http://admin.com/credentials/verify/${application.id}`,
			keyIndex: count,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			type: application.Credential.name
		});
	}
	const updatedApplication = await ApplicationsService.findByIdAndUpdate(
		req.params["id"] as string,
		{
			status,
			vc: verifiableCredential
		}
	);
	res.status(202).json(updatedApplication);
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
				alias: "admin-did",
				store: constructFileStore({
					path: path.join(IDENTITY_PATH as string, "account-store"),
					password: IDENTITY_SECRET as string
				})
			}).catch((e) => {
				console.error(e);
			});

			if (!did) return;

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
