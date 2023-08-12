import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const {
	PORT,
	METRICS_PORT,
	IDENTITY_PATH,
	IDENTITY_SECRET,
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
	ALLOWED_ORIGINS,
	PUBLIC_BASE_URI,
	PUBLIC_CLIENT_URI
} = process.env;
