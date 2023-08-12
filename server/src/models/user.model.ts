import {
	DataTypes,
	Model,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from "sequelize";
import bcrypt from "bcryptjs";

export class UserModel extends Model<
	InferAttributes<UserModel>,
	InferCreationAttributes<UserModel>
> {
	declare id: CreationOptional<string>;
	declare password: CreationOptional<string>;
	declare name: string;
	declare did: CreationOptional<string>;
	declare email: CreationOptional<string>;
	declare isSuperUser: CreationOptional<boolean>;
	declare isActive: CreationOptional<boolean>;

	async validateCredentials(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}

export const userModel = (db: Sequelize) => {
	UserModel.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			did: {
				type: DataTypes.STRING,
				allowNull: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true
			},
			isSuperUser: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false
			}
		},
		{
			sequelize: db,
			modelName: "User",
			hooks: {
				beforeSave: async (user) => {
					if (user.changed("password")) {
						user.password = await bcrypt.hash(user.password, 12);
					}
				}
			}
		}
	);

	return UserModel;
};
