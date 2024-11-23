import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { User } from "../models/User";
import { ProductReviews } from "../models/ProductReviews";


export interface ReviewLikesAttributes {
  id: number;
  user_id: number;
  review_id: number;
  action: number; // 1 for like, 0 for dislike
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ReviewLikesCreationAttributes
  extends Optional<
  ReviewLikesAttributes,
    | "created_at"
    | "updated_at"
  > {}

export class ReviewLikes
  extends Model<ReviewLikesAttributes>
  implements ReviewLikesAttributes
{
  public id!: number;
  public user_id!: number;
  public review_id!: number;
  public action!: number;
  public created_at!: Date | null;
  public updated_at!: Date | null;
}

ReviewLikes.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    review_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: ProductReviews,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    action: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "1 for like, 0 for dislike",
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
    tableName: "review_likes",
    timestamps: false,
  }
);

// Associations
User.belongsToMany(ProductReviews, { through: ReviewLikes, foreignKey: "user_id" });
ProductReviews.belongsToMany(User, { through: ReviewLikes, foreignKey: "review_id" });
ReviewLikes.belongsTo(User, { foreignKey: "user_id" });
ReviewLikes.belongsTo(ProductReviews, { foreignKey: "review_id" });
