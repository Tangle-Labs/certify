import { IDENTITY_MANAGER_ALIAS, IDENTITY_PATH, STRONGHOLD_SECRET } from "@/config";
import { IdentityManager } from "@tanglelabs/identity-manager";
import {
	ICreateDidProps,
	IIdentityManagerProps
} from "@tanglelabs/identity-manager/dist/identity-manager.types";

class _IdentityService {
	private manager: IdentityManager;

	constructor(props: IIdentityManagerProps) {
		this.build(props);
	}

	private async build(props: IIdentityManagerProps) {
		this.manager = await IdentityManager.newInstance({ ...props });
	}

	async newDid(props: ICreateDidProps) {
		return this.manager.createDid({ ...props });
	}

	getAdminDid() {
		return this.manager.getIdentityByAlias("admin-did");
	}
}

export const IdentityService = new _IdentityService({
	managerAlias: IDENTITY_MANAGER_ALIAS,
	filepath: IDENTITY_PATH,
	password: STRONGHOLD_SECRET
});
