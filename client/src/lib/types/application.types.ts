import type { ICredential } from "./credentials.types";
import type { IUser } from "./user.types";

export interface IApplication {
	id: string;
	status: "pending" | "approved" | "rejected";
	body: Record<string, any>;
	Credential?: ICredential;
	User?: IUser;
	userId?: string;
	credentialId?: string;
	createdAt: Date;
	updatedAt: Date;
}
