// src/models/Product.ts

import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { ProductCategory } from "./ProductCategory";

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  category_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    "description" | "created_at" | "updated_at"
  > {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string | null | undefined;
  public category_id!: number;
  public updated_at?: Date | null | undefined;
  public created_at?: Date | null | undefined;
}

// Initialize Product model
Product.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: ProductCategory, // Reference to ProductCategory model
        key: "id", // Foreign key references the id in ProductCategory
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Define associations (could be moved to src/models/index.ts for central management)
// Product.belongsTo(ProductCategory, {
//   foreignKey: "category_id",
//   as: "product_category",
// });

// ProductCategory.hasMany(Product, { foreignKey: "category_id", as: "products" });
