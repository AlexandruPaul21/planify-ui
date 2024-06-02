import { Component, OnInit } from '@angular/core';
import { ClientDto } from "../../integration/domain/ClientDto";
import { Router } from "@angular/router";
import { ClientService } from "../../integration/service/client.service";
import { MessageService } from "primeng/api";
import { EMAIL_REGEX } from '../../utils/validation';
import { calculateRating, filterReviews } from '../../review/utils/review-utils';
import { ReviewDto } from '../../integration/domain/ReviewDto';
import ReviewType = ReviewDto.ReviewTypeEnum;
import { MapsService } from '../../integration/service/maps.service';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';

@Component({
  selector: 'app-client-profile-page',
  templateUrl: './client-profile-page.component.html',
  styleUrls: ['./client-profile-page.component.scss'],
  providers: [MessageService],
})
export class ClientProfilePageComponent implements OnInit {
  protected readonly calculateRating = calculateRating;
  protected readonly ReviewType = ReviewType;
  public editMode = false;
  public validationMessage = '';
  public suggestions: string[] = [];

  public client: ClientDto = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phoneNumber: '',
    reviews: [],
    budget: 0,
    createdAt: new Date(),
  }

  public constructor(
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService,
    private mapsService: MapsService,
    private loadingSpinnerStore: LoadingSpinnerStore,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });

    try {
      this.client = await this.clientService.getCurrentClient();
    } catch (e: any) {
      await this.redirectToLogin();
    } finally {
      this.loadingSpinnerStore.update( { loading: false });
    }
  }

  public async onCancelClicked(): Promise<void> {
    await this.ngOnInit();
    this.editMode = false;
  }

  private async redirectToLogin(): Promise<void> {
    try {
      await this.router.navigate(['/login']);
    } catch (e) {

    }
    this.editMode = false;
  }

  public isSaveEnabled() {
    this.validationMessage = '';

    if (this.client.address.length === 0) {
      this.validationMessage += 'Address should not empty!\n';
    }

    if (this.client.email.length === 0) {
      this.validationMessage += 'Email should not empty!\n';
    } else if (! this.client.email.match(EMAIL_REGEX)) {
      this.validationMessage += 'Email format is not valid!\n';
    }

    if (this.client.phoneNumber.length === 0) {
      this.validationMessage += 'Phone Number should not empty!\n';
    }

    if (this.client.budget === 0) {
      this.validationMessage += 'Budget should not 0!\n';
    }

    if (this.client.firstname.length === 0) {
      this.validationMessage += 'Firstname should not empty!\n';
    }

    if (this.client.lastname.length === 0) {
      this.validationMessage += 'Lastname should not empty!\n';
    }

    return this.validationMessage === '';
  }

  public async onSaveClicked(): Promise<void> {
    try {
      await this.clientService.update(this.client.id, this.client);
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

  public async completeResults(query: string) {
    const result = await this.mapsService.getAutocomplete(query);
    this.suggestions = result.predictions.map(place => place.description);
  }

  protected readonly filterReviews = filterReviews;

  public async reviewsUpdated(): Promise<void> {
    await this.ngOnInit();
    this.messageService.add({
      severity: 'success',
      summary: 'Review deleted',
      detail: 'The review was successfully deleted',
    });
  }
}
