import type { IRole } from "./role.types";

export interface IUserStats {
	approved: number;
	pending: number;
	rejected: number;
}

export interface IUser {
	id: string;
	did?: string;
	password: string;
	name: string;
	email: string;
	isSuperUser: boolean;
	roleId?: string;
	Role?: IRole;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
