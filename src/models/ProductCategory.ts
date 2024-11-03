import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

export interface ProductCategoryAttributes {
  id: number;
  name: string;
  image?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProductCategoryCreationAttributes
  extends Optional<
    ProductCategoryAttributes,
    "image" | "created_at" | "updated_at"
  > {}

export class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes
{
  public id!: number;
  public name!: string;
  public image!: string | null;
  public created_at!: Date | null;
  public updated_at!: Date | null;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductCategory.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
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
    tableName: "product_category",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
