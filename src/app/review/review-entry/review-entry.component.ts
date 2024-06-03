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
  public reviewsChanged = new EventEmitter<string>();

  public constructor() {}

  public async deleteReview(id: string): Promise<void> {
    this.reviewsChanged.emit(id);
  }
}
