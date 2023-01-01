import { IDENTITY_PATH } from "@/config";
import path from "path";
import fs from "fs/promises";

export interface IOrganizationConfig {
	owner: string;
	did: string;
	orgName?: string;
	orgWebsite?: string;
	businessType?: string;
	orgDescription?: string;
}

class _OrganizationService {
	configPath: string;

	constructor() {
		const configPath = path.resolve(IDENTITY_PATH, "is-config.json");
		this.configPath = configPath;
	}

	async saveConfig(updateParams: Partial<IOrganizationConfig>) {
		const config = await this.loadConfig();
		for (const key of Object.keys(updateParams)) {
			config[key] = updateParams[key];
		}
		await fs.writeFile(this.configPath, JSON.stringify(config));
		return config;
	}

	async loadConfig() {
		const config = await fs.readFile(this.configPath);
		return JSON.parse(config.toString());
	}
}

export const OrganizationService = new _OrganizationService();
