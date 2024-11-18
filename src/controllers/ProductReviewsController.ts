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
}
