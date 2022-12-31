import {
	DataTypes,
	Model,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from "sequelize";

export type CredentialType = "license" | "certificate" | "ticket";

export class CredentialModel extends Model<
	InferAttributes<CredentialModel>,
	InferCreationAttributes<CredentialModel>
> {
	declare id: CreationOptional<string>;
	declare name: string;
	declare referenceCode: string;
	declare type: CredentialType;
	declare duration: number;
	declare customFields: Record<string, string>;
}

export const credentialModel = (db: Sequelize) => {
	CredentialModel.init(
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
				allowNull: false
			},
			referenceCode: {
				type: DataTypes.STRING,
				allowNull: false
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			customFields: {
				type: DataTypes.JSON,
				allowNull: false
			}
		},
		{
			sequelize: db,
			modelName: "Credential"
		}
	);

	return CredentialModel;
};
