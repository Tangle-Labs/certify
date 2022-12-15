import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config";
import { userModel } from "./user.model";
import { sessionModel } from "./session.model";

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

User.hasOne(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

export { db };
