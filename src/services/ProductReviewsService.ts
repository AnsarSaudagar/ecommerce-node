import { ProductReviews } from "../models/ProductReviews";

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
    });

    return reviews;
  }
}
