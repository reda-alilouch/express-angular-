import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: CreationOptional<number>;
  declare nom: string;
  declare prenom: string;
  declare email: string | null;
  declare telephone: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initClient = (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: { type: DataTypes.STRING(50), allowNull: false },
      prenom: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: true },
      telephone: { type: DataTypes.STRING(15), allowNull: false, unique: true },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "clients",
      underscored: true,
    }
  );
  return Client;
};
