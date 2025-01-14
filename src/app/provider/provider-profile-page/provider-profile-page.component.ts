import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../../integration/service/service.service";
import { ServiceDto } from "../../integration/domain/ServiceDto";
import { ProviderDto } from "../../integration/domain/ProviderDto";
import { Router } from "@angular/router";
import { ProviderService } from "../../integration/service/provider.service";
import { MessageService } from "primeng/api";
import { EMAIL_REGEX } from '../../utils/validation';
import { calculateRating, filterReviews } from '../../review/utils/review-utils';
import { ReviewDto } from '../../integration/domain/ReviewDto';
import { MapsService } from '../../integration/service/maps.service';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';
import ReviewType = ReviewDto.ReviewTypeEnum;
import { ReviewService } from '../../integration/service/review.service';

@Component({
  selector: 'app-provider-profile-page',
  templateUrl: './provider-profile-page.component.html',
  styleUrls: ['./provider-profile-page.component.scss'],
  providers: [MessageService],
})
export class ProviderProfilePageComponent implements OnInit {
  protected readonly filterReviews = filterReviews;
  protected readonly calculateRating = calculateRating;
  protected readonly ReviewType = ReviewType;
  public editMode = false;
  public existingServices: ServiceDto[] = [];

  public servicesString: string[] = []
  public selectedServices: string[] = [];

  public validationMessage = '';
  public suggestions: string[] = [];

  public provider: ProviderDto = {
    id: '',
    name: '',
    username: '',
    email: '',
    revenue: 0,
    offeredServices: [],
    fiscalCode: '',
    address: '',
    phoneNumber: '',
    reviews: [],
    createdAt: new Date(),
  };
  public deleteReviewDialogOpen = false;
  public targetedReviewId = '';

  public constructor(
    private serviceService: ServiceService,
    private router: Router,
    private providerService: ProviderService,
    private messageService: MessageService,
    private mapsService: MapsService,
    private loadingSpinnerStore: LoadingSpinnerStore,
    private reviewService: ReviewService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    this.existingServices = await this.serviceService.getAllServices();
    this.servicesString = this.existingServices.map(service => service.serviceName);

    try {
      this.provider = await this.providerService.getCurrentProvider();
      this.selectedServices = this.provider.offeredServices.map(service => service.serviceName);
    } catch (e: any) {
      await this.redirectToLogin();
    } finally {
      this.loadingSpinnerStore.update( { loading: false });
    }
  }

  private async redirectToLogin(): Promise<void> {
    await this.router.navigate(['/login'])
  }

  public isSaveEnabled(): boolean {
    this.validationMessage = '';

    if (this.provider.name.length === 0) {
      this.validationMessage += 'Name should not be empty!\n';
    }

    if (this.provider.email.length === 0) {
      this.validationMessage += 'Email should not be empty!\n';
    } else if (! this.provider.email.match(EMAIL_REGEX)) {
      this.validationMessage += 'Email format is not valid!\n';
    }

    if (this.provider.address.length === 0) {
      this.validationMessage += 'Address should not be empty!\n';
    }

    if (this.provider.fiscalCode.length === 0) {
      this.validationMessage += 'Fiscal Code should not be empty!\n';
    }

    if (this.provider.offeredServices.length === 0) {
      this.validationMessage += 'Provider should offer at least one service\n';
    }

    if (this.provider.phoneNumber.length === 0) {
      this.validationMessage += 'Phone number should not be empty!\n';
    }

    return this.validationMessage === '';
  }

  public async onCancelClicked(): Promise<void> {
    await this.ngOnInit();
    this.editMode = false;
  }

  public async onSaveClicked(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    try {
      await this.providerService.update(this.provider.id, this.provider);
      this.editMode = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Update successful',
        detail: 'User details have been update successfully',
      });
    } catch (e: any) {
      if (e['status'] === 401 || e['status'] === 403) {
        await this.redirectToLogin();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Update failed',
          detail: 'There was an error. Please try again!',
        });
      }
    } finally {
      this.loadingSpinnerStore.update( { loading: false });
    }
  }

  public async completeResults(query: string) {
    const result = await this.mapsService.getAutocomplete(query);
    this.suggestions = result.predictions.map(place => place.description);
  }


  public async deleteReview(targetedReviewId: string): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    await this.reviewService.deleteReview(targetedReviewId);
    this.deleteReviewDialogOpen = false;
    await this.ngOnInit();
    this.messageService.add({
      severity: 'success',
      summary: 'Review deleted',
      detail: 'The review was successfully deleted',
    });
    this.loadingSpinnerStore.update( { loading: false });
  }
}
