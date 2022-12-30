import {
	DataTypes,
	Model,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	ForeignKey
} from "sequelize";
import { CredentialModel } from "./credential.model";
import { UserModel } from "./user.model";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export class ApplicationModel extends Model<
	InferAttributes<ApplicationModel>,
	InferCreationAttributes<ApplicationModel>
> {
	declare id: CreationOptional<string>;
	declare credentialId: ForeignKey<CredentialModel["id"]>;
	declare userId: ForeignKey<UserModel["id"]>;
	declare status: ApplicationStatus;
	declare body: Record<string, any>;
}

export const applicationModel = (db: Sequelize) => {
	ApplicationModel.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
				allowNull: false
			},
			status: {
				type: DataTypes.ENUM,
				values: ["pending", "approved", "rejected"],
				defaultValue: "pending",
				allowNull: false
			},
			body: {
				type: DataTypes.JSON,
				allowNull: false
			}
		},
		{
			sequelize: db,
			modelName: "Credential"
		}
	);

	return ApplicationModel;
};
