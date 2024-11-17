import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";


export interface AddressAttributes {
  id: number;
  first_name: string;
  last_name: string;
  user_id: number;
  address: string;
  city: string;
  pincode: number;
  phone_number?: number;
  is_default: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface AddressCreationAttributes
  extends Optional<
    AddressAttributes,
    "phone_number" | "created_at" | "updated_at"
  > {}

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
    public id!: number;
  public first_name!: string;
  public last_name!: string;
  public user_id!: number;
  public address!: string;
  public city!: string;
  public pincode!: number;
  public phone_number?: number;
  public is_default!: number;
  public created_at!: Date | null;
  public updated_at!: Date | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static IS_NOT_DEFAULT = 0;
  public static IS_DEFAULT = 1;
}

Address.init(
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
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: User, 
        key: "id", 
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    is_default:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Address.IS_NOT_DEFAULT,
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
    tableName: "addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
