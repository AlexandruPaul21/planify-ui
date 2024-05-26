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
import ReviewType = ReviewDto.ReviewTypeEnum;

@Component({
  selector: 'app-provider-profile-page',
  templateUrl: './provider-profile-page.component.html',
  styleUrls: ['./provider-profile-page.component.scss'],
  providers: [MessageService],
})
export class ProviderProfilePageComponent implements OnInit {
  protected readonly filterReviews = filterReviews;
  protected readonly ReviewType = ReviewType;
  protected readonly calculateRating = calculateRating;
  public editMode = false;
  public existingServices: ServiceDto[] = [];

  public servicesString: string[] = []
  public selectedServices: string[] = [];

  public validationMessage = '';

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
  public loading: boolean = false;

  public constructor(
    private serviceService: ServiceService,
    private router: Router,
    private providerService: ProviderService,
    private messageService: MessageService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.existingServices = await this.serviceService.getAllServices();
    this.servicesString = this.existingServices.map(service => service.serviceName);

    const providerId = localStorage.getItem('id');
    if (providerId == null) {
      this.loading = false;
      await this.redirectToLogin();
      return;
    }

    try {
      this.provider = await this.providerService.getById(providerId);
      this.selectedServices = this.provider.offeredServices.map(service => service.serviceName);
    } catch (e: any) {
      await this.redirectToLogin();
    } finally {
      this.loading = false;
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
    }
  }

  public async reviewsUpdated(): Promise<void> {
    await this.ngOnInit();
    this.messageService.add({
      severity: 'success',
      summary: 'Review deleted',
      detail: 'The review was successfully deleted',
    });
  }
}
