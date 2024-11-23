import { ReviewLikes } from "../models/ReviewLikes";

export class ReviewLikesService {
  async createLikeReview(review_details: any) {
    const review_like = await ReviewLikes.create(review_details);

    return review_like;
  }

  async getLikeReview(user_id: number, review_id: number) {
    const review_like = await ReviewLikes.findOne({
      where: {
        user_id: user_id,
        review_id: review_id,
      },
    });
    return review_like;
  }

  async deleteLikeReview(user_id: number, review_id: number) {
    const review_like = await ReviewLikes.findOne({
      where: {
        user_id: user_id,
        review_id: review_id,
      },
    });

    if (await review_like?.destroy()) {
      return true;
    }else{
        throw new Error("Review like is not deleted")
    }
  }

  async changeAction(user_id: number, review_id: number, action: number) {
    const review_like: ReviewLikes | null = await ReviewLikes.findOne({
      where: {
        user_id: user_id,
        review_id: review_id,
      },
    });

    if (review_like) {
      review_like.action = action;
    }
    review_like?.save();
    return review_like;
  }
}
