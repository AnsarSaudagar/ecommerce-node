import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { Product } from "./Product";

export interface ProductImageAttributes {
  id: number;
  product_id: number;
  image_name: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProductImageCreationAttributes
  extends Optional<ProductImageAttributes, "created_at" | "updated_at"> {}

export class ProductImage
  extends Model<ProductImageAttributes>
  implements ProductImageAttributes
{
  public id!: number;
  public product_id!: number;
  public image_name!: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "product_images",
    timestamps: true,
  }
);


ProductImage.belongsTo(Product, {foreignKey: "product_id"})