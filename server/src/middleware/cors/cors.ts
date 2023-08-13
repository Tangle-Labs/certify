import { ALLOWED_ORIGINS } from "@/config";

const origin = ALLOWED_ORIGINS.split(",").map((e) => e.trim());

export const corsConfig = {
	origin: function (originReceived, cb) {
		return cb(null, true);
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "token", "Authorization"]
};
