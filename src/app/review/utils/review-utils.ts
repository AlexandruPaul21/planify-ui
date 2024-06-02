import { ReviewDto } from '../../integration/domain/ReviewDto';
import ReviewType = ReviewDto.ReviewTypeEnum

export function filterReviews(reviews: ReviewDto[], reviewType: ReviewType): ReviewDto[] {
  return reviews.filter(review => review.type === reviewType);
}

export function calculateRating(reviews: ReviewDto[], reviewType: ReviewType): number {
  if (reviews.length === 0) {
    return -1;
  }

  const filteredReviews = filterReviews(reviews, reviewType);
  return filteredReviews
            .map(review => review.rating)
            .reduce((a, b) => a + b) / filteredReviews.length;
}
