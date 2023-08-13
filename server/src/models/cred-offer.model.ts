import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from "sequelize";

export class CredOffer extends Model<
	InferAttributes<CredOffer>,
	InferCreationAttributes<CredOffer>
> {
	declare id: string;
	declare offer: Record<string, any>;
}

export const credOfferModel = (db: Sequelize) => {
	CredOffer.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
				allowNull: false
			},
			offer: {
				type: DataTypes.JSONB,
				allowNull: false
			}
		},
		{
			sequelize: db,
			modelName: "CredOffer"
		}
	);

	return CredOffer;
};
