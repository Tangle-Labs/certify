import { base } from "$app/paths";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const previousPath: Writable<string> = writable(base);
