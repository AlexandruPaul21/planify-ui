import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewDto } from '../../integration/domain/ReviewDto';

@Component({
  selector: 'reviews-tab',
  templateUrl: './reviews-tab.component.html',
  styleUrls: ['./reviews-tab.component.scss']
})
export class ReviewsTabComponent {
  @Input()
  public header!: string;

  @Input()
  public subheader!: string;

  @Input()
  public reviews!: ReviewDto[];

  @Input()
  public owner: boolean = false;

  @Output()
  public reviewsChanged = new EventEmitter<void>();
}
