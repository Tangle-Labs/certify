import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const {
	PORT,
	METRICS_PORT,
	IDENTITY_PATH,
	STRONGHOLD_SECRET,
	IDENTITY_MANAGER_ALIAS,
	IDENTITY_DB_URI,
	DB_PORT,
	DB_HOST,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	LOG_PATH,
	LOG_LEVEL,
	SESSION_SECRET,
	FILTER_KEYS,
	ALLOWED_ORIGINS
} = process.env;
