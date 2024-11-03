import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database"

export interface UserAttributes {
  id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  email_verified_at?: Date | null;
  password: string;
  api_token?: string | null;
  remember_token?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

// Optional fields for the creation of a new user
export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "middle_name"
    | "email_verified_at"
    | "api_token"
    | "remember_token"
    | "created_at"
    | "updated_at"
  > {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public first_name!: string;
  public middle_name!: string | null;
  public last_name!: string;
  public email!: string;
  public email_verified_at!: Date | null;
  public password!: string;
  public api_token!: string | null;
  public remember_token!: string | null;
  public created_at!: Date | null;
  public updated_at!: Date | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    api_token: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: true,
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
