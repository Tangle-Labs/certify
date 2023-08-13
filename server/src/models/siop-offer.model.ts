import { DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes } from "sequelize";

export class SiopOffer extends Model<
	InferAttributes<SiopOffer>,
	InferCreationAttributes<SiopOffer>
> {
	declare id: string;
	declare request: string;
}

export const siopOfferModel = (db: Sequelize) => {
	SiopOffer.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
				allowNull: false
			},
			request: {
				type: DataTypes.TEXT
			}
		},
		{
			sequelize: db,
			modelName: "SiopOffer"
		}
	);

	return SiopOffer;
};
