import { Request, Response } from "express";
import { ProductReviewsService } from "../services/ProductReviewsService";
import { ProductReviews } from "../models/ProductReviews";
import { IGetUserAuthInfoRequest } from "../@types/express";
import { ReviewLikesService } from "../services/ReviewLikesService";
import { ReviewLikes } from "../models/ReviewLikes";

export class ProductReviewsController {
  private productReviewsService: ProductReviewsService;
  private reviewLikeService: ReviewLikesService;

  constructor() {
    this.productReviewsService = new ProductReviewsService();
    this.reviewLikeService = new ReviewLikesService();
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

  async likeReview(req: IGetUserAuthInfoRequest, res: Response){
    try {

      if(!req.userId){
        throw new Error("User is not logged in");
      }

      const review_id: number = +req.params.review_id;
      const user_id = +req.userId

      // Checking if user has previously liked or not
      const existing_review_like : ReviewLikes | null = await this.reviewLikeService.getLikeReview(user_id, review_id);

      if(existing_review_like && existing_review_like.action === 1){
        // 1 = for like
        await this.productReviewsService.likeReview(review_id, -1);
        await this.reviewLikeService.deleteLikeReview(
          user_id,
          review_id
        );
        res.json({
          message: "Review is already liked"
        })
        return
      }

      if(existing_review_like && existing_review_like.action === 0){
        // 0 = for dislike
        await this.productReviewsService.likeReview(review_id, 1);
        await this.productReviewsService.dislikeReview(review_id, -1);

        existing_review_like.action = 1;
        existing_review_like.save();

        res.json({
          message: "Review changed to liked"
        })
        return
      }

      const new_review_like : ReviewLikes = await this.reviewLikeService.createLikeReview({
        user_id: user_id,
        review_id: review_id,
        action: 1,
      })
      await this.productReviewsService.likeReview(review_id, 1);

      res.json({
        message: "Review is liked"
      })
      return

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async dislikeReview(req: IGetUserAuthInfoRequest, res: Response){
    try {

      if(!req.userId){
        throw new Error("User is not logged in");
      }

      const review_id: number = +req.params.review_id;
      const user_id = +req.userId

      // Checking if user has previously liked or not
      const existing_review_like : ReviewLikes | null = await this.reviewLikeService.getLikeReview(user_id, review_id);

      if(existing_review_like && existing_review_like.action === 0){
        // 0 = for dislike
        await this.productReviewsService.dislikeReview(review_id, -1);
        await this.reviewLikeService.deleteLikeReview(
          user_id,
          review_id
        );
        res.json({
          message: "Review is already disliked"
        })
        return
      }

      if(existing_review_like && existing_review_like.action === 1){
        // 1 = for like
        await this.productReviewsService.dislikeReview(review_id, 1);
        await this.productReviewsService.likeReview(review_id, -1);

        existing_review_like.action = 0;
        existing_review_like.save();

        res.json({
          message: "Review changed to disliked"
        })
        return
      }

      const new_review_like : ReviewLikes = await this.reviewLikeService.createLikeReview({
        user_id: user_id,
        review_id: review_id,
        action: 0,
      })
      await this.productReviewsService.dislikeReview(review_id, 1);

      res.json({
        message: "Review is disliked"
      })

    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
