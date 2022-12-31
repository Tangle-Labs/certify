import {
	DataTypes,
	Model,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from "sequelize";

export class RoleModel extends Model<
	InferAttributes<RoleModel>,
	InferCreationAttributes<RoleModel>
> {
	declare id: CreationOptional<string>;
	declare manageCredentials: boolean;
	declare manageOrganization: boolean;
	declare manageApplications: boolean;
	declare manageStaff: boolean;
	declare manageRoles: boolean;
}

export const roleModel = (db: Sequelize) => {
	RoleModel.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
				allowNull: false
			},
			manageCredentials: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			manageOrganization: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			manageApplications: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			manageStaff: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			manageRoles: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		},
		{
			sequelize: db,
			modelName: "Role"
		}
	);

	return RoleModel;
};
