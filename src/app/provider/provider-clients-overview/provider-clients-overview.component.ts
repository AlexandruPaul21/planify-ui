import { Component, OnInit } from '@angular/core';
import { calculateRating, filterReviews } from "../../review/utils/review-utils";
import { ReviewDto } from '../../integration/domain/ReviewDto';
import { ClientDto } from '../../integration/domain/ClientDto';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';
import { ClientService } from '../../integration/service/client.service';
import ReviewType = ReviewDto.ReviewTypeEnum;

@Component({
  selector: 'app-provider-clients-overview',
  templateUrl: './provider-clients-overview.component.html',
  styleUrls: ['./provider-clients-overview.component.scss']
})
export class ProviderClientsOverviewComponent implements OnInit {
  protected readonly calculateRating = calculateRating;
  protected readonly ReviewType = ReviewType;

  public clients: ClientDto[] = [];
  public activeClient: ClientDto | null = null;
  public reviewsTabOpen = false;

  public constructor(
    private clientService: ClientService,
    private loadingSpinnerStore: LoadingSpinnerStore,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update({ loading: true });
    this.clients = await this.clientService.getClientsForAuthenticatedProvider();
    this.loadingSpinnerStore.update({ loading: false });
  }

  protected readonly filterReviews = filterReviews;
}
