import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "./User";
import { Product } from "./Product";

export interface ProductReviewsAttributes {
  id: number;
  product_id: number;
  user_id?: number;
  name: string;
  email: string;
  title?: string;
  content?: string;
  rating: number;
  like_count?: number;
  dislike_count?: number;
  is_verified?: number;
  is_user_like?: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProductReviewsCreationAttributes
  extends Optional<
    ProductReviewsAttributes,
    | "user_id"
    | "title"
    | "content"
    | "like_count"
    | "dislike_count"
    | "is_verified"
    | "is_user_like"
    | "created_at"
    | "updated_at"
  > {}

export class ProductReviews
  extends Model<ProductReviewsAttributes, ProductReviewsCreationAttributes>
  implements ProductReviewsAttributes
{
  public id!: number;
  public product_id!: number;
  public user_id?: number;
  public name!: string;
  public email!: string;
  public title?: string;
  public content?: string;
  public rating!: number;
  like_count?: number | undefined;
  dislike_count?: number | undefined;
  is_verified?: number | undefined;
  is_user_like?: number | undefined;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;

  public static associate() {
    ProductReviews.belongsTo(User, { foreignKey: "user_id", as: "user" });
    ProductReviews.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

ProductReviews.init(
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    dislike_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    is_user_like: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
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
    tableName: "product_reviews",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
