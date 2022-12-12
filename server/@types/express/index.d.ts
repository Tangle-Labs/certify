import { UserModel } from "@/models/user.model";
import { SessionModel } from "@/models/session.model";

declare global {
	namespace Express {
		interface User extends UserModel {}
		interface Session extends SessionModel {}

		interface Request {
			user?: User;
			session?: Session;
		}
	}
}
