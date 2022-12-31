import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config";
import { userModel } from "./user.model";
import { sessionModel } from "./session.model";
import { credentialModel } from "./credential.model";
import { applicationModel } from "./application.model";
import { roleModel } from "./role.model";

const db = new Sequelize({
	dialect: "postgres",
	host: DB_HOST,
	port: Number(DB_PORT),
	database: DB_NAME,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	logging: false
});

export const User = userModel(db);
export const Session = sessionModel(db);
export const Credential = credentialModel(db);
export const Application = applicationModel(db);
export const Role = roleModel(db);

/**
 *  ----------- Relations ------------
 */

// user and session
User.hasOne(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

// credentials, application and user
Credential.hasMany(Application, { foreignKey: "credentialId" });
Application.belongsTo(Credential, { foreignKey: "credentialId" });

User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export { db };
