export interface IUser {
	id: string;
	password: string;
	name: string;
	email: string;
	isSuperUser: boolean;
}

import { writable } from "svelte/store";

export const user = writable<IUser>();
