import { ProductReviews } from "../models/ProductReviews";

export class ProductReviewsService {
  async addNewProductReview(
    review_data: ProductReviews
  ): Promise<ProductReviews> {
    const review: ProductReviews = await ProductReviews.create(review_data);
    return review;
  }
}
