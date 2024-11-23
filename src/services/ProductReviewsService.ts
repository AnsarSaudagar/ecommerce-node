import sequelize, { where } from "sequelize";
import { ProductReviews } from "../models/ProductReviews";
import { ReviewLikes } from "../models/ReviewLikes";

export class ProductReviewsService {
  async addNewProductReview(
    review_data: ProductReviews
  ): Promise<ProductReviews> {
    const review: ProductReviews = await ProductReviews.create(review_data);
    return review;
  }

  async getProductReview(product_id: number): Promise<ProductReviews[]> {
    const reviews: ProductReviews[] = await ProductReviews.findAll({
      where: {
        product_id: product_id,
      },
      order: [["created_at", "DESC"]],
    });

    return reviews;
  }

  async getProductReviewCountAndAvg(product_id: number) {
    const result = await ProductReviews.findOne({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("rating")), "rating_count"],
        [sequelize.fn("AVG", sequelize.col("rating")), "average_rating"],
      ],
      where: {
        product_id: product_id,
      },
      raw: true,
    });

    return result;
  }

  async likeReview(review_id: number, count: number) {
    return await ProductReviews.increment("like_count", {
      by: count,
      where: { id: review_id },
    });
  }

  async dislikeReview(review_id: number, count: number) {
    return await ProductReviews.increment("dislike_count", {
      by: count,
      where: { id: review_id },
    });
  }
}
