import { ALLOWED_ORIGINS } from "@/config";

const origin = ALLOWED_ORIGINS.split(",").map((e) => e.trim());

export const corsConfig = {
	origin: function (originReceived, cb) {
		if (origin.includes(originReceived)) return cb(null, true);
		return cb("Cors not allowed");
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "token", "Authorization"]
};
