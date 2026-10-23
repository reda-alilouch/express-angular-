import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { Role } from "../enums/adminRole";

export class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: Role;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initAdmin = (sequelize: any) => {
  Admin.init(
    {
      id: {
        type: "INTEGER",
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: "STRING", allowNull: false },
      email: { type: "STRING", allowNull: false, unique: true },
      password: { type: "STRING", allowNull: false },
      role: {
        type: "ENUM",
        values: Object.values(Role),
        allowNull: false,
      },
      createdAt: "DATE",
      updatedAt: "DATE",
    },
    {
      sequelize,
      tableName: "admins",
      underscored: true,
    }
  );
  return Admin;
};
