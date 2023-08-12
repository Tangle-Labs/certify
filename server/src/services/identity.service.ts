import {
	IDENTITY_MANAGER_ALIAS,
	IDENTITY_PATH,
	IDENTITY_SECRET,
	PUBLIC_BASE_URI,
	PUBLIC_CLIENT_URI
} from "@/config";
import {
	CreateDidProps,
	GenericStore,
	IdentityManager,
	IdentityManagerOptions,
	encryptWithAES
} from "@tanglelabs/ssimon";
import { IotaAccount, IotaAdapter } from "@tanglelabs/iota-identity-adapter";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { RelyingParty, SigningAlgs } from "@tanglelabs/oid4vc";
import { resolver } from "@/utils";

export const constructFileStore = ({ path, password }: { path: string; password: string }) => {
	const writer = async (body: string) => {
		await writeFile(path, body);
	};
	const reader = async () => {
		const data = await readFile(path).catch(async (e) => {
			if (e.code === "ENOENT") {
				const encryptedEmptyArray = encryptWithAES("[]", password);
				await writer(encryptedEmptyArray);
				return encryptedEmptyArray;
			}
			throw new Error();
		});

		return data.toString();
	};
	const store = new GenericStore({ path, password, reader, writer });

	return store;
};

class _IdentityService {
	manager: IdentityManager<IotaAccount<any>>;
	rp: RelyingParty;

	constructor(props: IdentityManagerOptions<any>) {
		this.build(props);
	}

	private async build(props: IdentityManagerOptions<any>) {
		this.manager = await IdentityManager.build({ ...props });
		const config = await this.manager.storage.findOne({ alias: "admin-did" });
		this.rp = new RelyingParty({
			redirectUri: `${PUBLIC_BASE_URI}/siop-auth`,
			resolver,
			did: config.did,
			kid: config.did + "#vc-signature",
			privKeyHex: config.seed,
			clientId: config.did,
			clientMetadata: {
				subjectSyntaxTypesSupported: ["did:iota"],
				idTokenSigningAlgValuesSupported: [SigningAlgs.EdDSA],
				clientName: "Certify",
				logoUri: `${PUBLIC_CLIENT_URI}/imgs/certify-logo.png`
			}
		});
	}

	async newDid(props: CreateDidProps<any>) {
		return this.manager.createDid({ ...props });
	}

	async getAdminDid() {
		const store = constructFileStore({
			path: path.join(IDENTITY_PATH as string, "account-store"),
			password: IDENTITY_SECRET as string
		});
		const account = await this.manager.getDid({
			alias: "admin-did",
			store
		});
		return account;
	}
}

export const IdentityService = new _IdentityService({
	adapter: IotaAdapter,
	storage: constructFileStore({
		path: path.join(IDENTITY_PATH as string, "./identity-service"),
		password: IDENTITY_SECRET
	})
});
