import type { IRole } from "./role.types";

export interface IUser {
	id: string;
	password: string;
	name: string;
	email: string;
	isSuperUser: boolean;
	roleId?: string;
	Role?: IRole;
	createdAt: Date;
	updatedAt: Date;
}
