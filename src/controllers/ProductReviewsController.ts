import { Request, Response } from "express";
import { ProductReviewsService } from "../services/ProductReviewsService";
import { ProductReviews } from "../models/ProductReviews";

export class ProductReviewsController {
  private productReviewsService: ProductReviewsService;

  constructor() {
    this.productReviewsService = new ProductReviewsService();
  }

  async addNewProductReview(req: Request, res: Response) {
    try {
      const review: ProductReviews =
        await this.productReviewsService.addNewProductReview(req.body);

      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getProductReview(req: Request, res: Response) {
    try {
      const reviews = await this.productReviewsService.getProductReview(
        +req.params.product_id
      );
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async getProductReviewCountAndAvg(req: Request, res: Response) {
    try {
      const { rating_count, average_rating }: any =
        await this.productReviewsService.getProductReviewCountAndAvg(
          +req.params.product_id
        );
      return res.json({
        rating_count: rating_count,
        average_rating: average_rating,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}
