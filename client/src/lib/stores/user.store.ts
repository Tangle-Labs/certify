import { writable } from "svelte/store";
import type { IUser } from "$lib/types";

export const user = writable<IUser>();
