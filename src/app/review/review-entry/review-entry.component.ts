import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewDto } from '../../integration/domain/ReviewDto';
import { ReviewService } from '../../integration/service/review.service';

@Component({
  selector: 'review-entry',
  templateUrl: './review-entry.component.html',
  styleUrls: ['./review-entry.component.scss']
})
export class ReviewEntryComponent {
  @Input()
  public review!: ReviewDto;

  @Input()
  public owner!: boolean;

  @Output()
  public reviewsChanged = new EventEmitter<void>();

  public constructor(
    private reviewService: ReviewService,
  ) {}

  public async deleteReview(): Promise<void> {
    await this.reviewService.deleteReview(this.review.id);
    this.reviewsChanged.emit();
  }
}
