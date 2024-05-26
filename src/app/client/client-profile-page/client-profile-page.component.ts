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
  public loading: boolean = false;

  public constructor(
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService,
    private mapsService: MapsService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    const clientId = localStorage.getItem('id');

    if (clientId == null) {
      this.loading = false;
      await this.redirectToLogin();
      return;
    }

    try {
      this.client = await this.clientService.getById(clientId);
    } catch (e: any) {
      await this.redirectToLogin();
    } finally {
      this.loading = false;
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
}
