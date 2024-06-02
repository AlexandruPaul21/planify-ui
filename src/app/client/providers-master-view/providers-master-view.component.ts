import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../integration/service/service.service';
import { ServiceDto } from '../../integration/domain/ServiceDto';
import { ProviderDto } from '../../integration/domain/ProviderDto';
import { ProviderService } from '../../integration/service/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { promiseFromObservable } from '../../integration/utils/rest-utils';
import { calculateRating, filterReviews } from '../../review/utils/review-utils';
import { ReviewDto } from '../../integration/domain/ReviewDto';
import ReviewType = ReviewDto.ReviewTypeEnum;
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';

@Component({
  selector: 'app-providers-master-view',
  templateUrl: './providers-master-view.component.html',
  styleUrls: ['./providers-master-view.component.scss'],
})
export class ProvidersMasterViewComponent implements OnInit {
  protected readonly filterReviews = filterReviews;
  protected readonly calculateRating = calculateRating;
  protected readonly ReviewType = ReviewType;
  public availableServices: ServiceDto[] = [];
  public selectedService: ServiceDto | null = null;
  public reviewsTabOpen = false;

  public providers: ProviderDto[] = [];
  public activeProvider: ProviderDto | null = null;

  public constructor(
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private loadingSpinnerStore: LoadingSpinnerStore,
    private router: Router,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    this.availableServices = await this.serviceService.getAllServices();

    const q = await promiseFromObservable(this.route.queryParams);
    if (q['service'] != null) {
      this.selectedService = this.availableServices.find(service => service.serviceName === q['service'])!!;
      await this.onServiceSelectionChange();
    }
    this.loadingSpinnerStore.update( { loading: false });
  }

  public async onServiceSelectionChange(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    if (this.selectedService == null) {
      this.providers = [];
      this.loadingSpinnerStore.update( { loading: false });
      return;
    }
    this.providers = await this.providerService.getByServiceOffered(this.selectedService);
    this.loadingSpinnerStore.update( { loading: false });
  }

  public getOfferedServicesString(provider: ProviderDto): string {
    return provider.offeredServices
    .map(service => service.serviceName)
    .reduce((a, b) => a + ', ' + b);
  }

  public async onContactProviderClicked(provider: ProviderDto): Promise<void> {
    await this.router.navigate(['/client/new-contract'], {
      queryParams: { username: provider.username },
    });
  }
}
