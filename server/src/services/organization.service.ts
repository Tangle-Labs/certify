import { IDENTITY_PATH } from "@/config";
import path from "path";
import fs from "fs/promises";

class _OrganizationService {
	configPath: string;

	constructor() {
		const configPath = path.resolve(IDENTITY_PATH, "is-config.json");
		this.configPath = configPath;
	}

	async loadConfig() {
		const config = await fs.readFile(this.configPath);
		return JSON.parse(config.toString());
	}
}

export const OrganizationService = new _OrganizationService();
