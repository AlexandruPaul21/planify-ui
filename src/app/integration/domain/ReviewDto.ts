export interface ReviewDto {
  id: string;
  rating: number;
  title: string;
  text: string;
  type: ReviewDto.ReviewTypeEnum;
}

export namespace ReviewDto {
  export type ReviewTypeEnum = 'CLIENT_REVIEW' | 'PROVIDER_REVIEW';
  export const ReviewTypeEnum = {
    CLIENT_REVIEW: 'CLIENT_REVIEW' as ReviewTypeEnum,
    PROVIDER_REVIEW: 'PROVIDER_REVIEW' as ReviewTypeEnum,
  }
}
