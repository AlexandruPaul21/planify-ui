import { Component, OnInit } from '@angular/core';
import { ClientSignUpDto } from '../../integration/domain/auth/ClientSignUpDto';
import { ProviderSignUpDto } from '../../integration/domain/auth/ProviderSignUpDto';
import { ServiceService } from '../../integration/service/service.service';
import { AuthenticationService } from '../../integration/service/auth/authentication.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ServiceDto } from '../../integration/domain/ServiceDto';
import { MapsService } from '../../integration/service/maps.service';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService],
})
export class SignUpComponent implements OnInit {
  public options = ['Provider', 'Client'];
  public selectedOption: 'Provider' | 'Client' | '' = '';
  public availableServices: ServiceDto[] = [];
  public services: string[] = [];
  public selectedServices: string[] = [];
  public validationMessage = 'None of the user options are selected!';

  public suggestions: string[] = [];
  public loading: boolean = false;

  public clientSignUpDto: ClientSignUpDto = {
    firstname: '',
    lastname: '',
    username: '',
    address: '',
    phoneNumber: '',
    password: '',
    budget: 0,
    email: ''
  };
  public clientConfirmPassword: string = '';

  public providerSignUpDto: ProviderSignUpDto = {
    name: '',
    fiscalCode: '',
    username: '',
    email: '',
    address: '',
    offeredServices: [],
    phoneNumber: '',
    password: ''
  };
  public providerConfirmPassword = '';

  public async ngOnInit(): Promise<void> {
    this.availableServices = await this.serviceService.getAllServices();
    this.services = this.availableServices.map(service => service.serviceName);
  }

  public constructor(
    private serviceService: ServiceService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router,
    private mapsService: MapsService,
    private loadingSpinnerStore: LoadingSpinnerStore,
  ) {
    this.loadingSpinnerStore.update({ loading: false });
  }

  public async onSignUpClicked(): Promise<void> {
    this.loading = true;
    try {
      switch (this.selectedOption) {
        case "Client":
          await this.authenticationService.clientSignUp(this.clientSignUpDto);
          break;
        case "Provider":
          this.providerSignUpDto.offeredServices = this.availableServices.filter(
            service => this.selectedServices.find(
              selectedService => selectedService === service.serviceName
            )
          );
          await this.authenticationService.providerSignUp(this.providerSignUpDto);
          break;
        default:
          return;
      }
      await this.router.navigate(
        ['/login'],
        { queryParams: { afterSignUp: true } }
      );
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Sign up failed',
        detail: 'Username not unique! Try another, if the problem persist, try again later!',
      });
    } finally {
      this.loading = false;
    }
  }

  public isSignUpEnabled(): boolean {
    switch (this.selectedOption) {
      case 'Client':
        return this.validateClient();
      case 'Provider':
        return this.validateProvider();
      case '':
        this.validationMessage = 'None of the user types are selected!'
        return false;
    }
  }

  private validateClient(): boolean {
    this.validationMessage = '';

    if (this.clientSignUpDto.username.length < 6) {
      this.validationMessage += 'Username should have length at least 6!\n';
    }

    if (this.clientSignUpDto.address.length === 0) {
      this.validationMessage += 'Address should not empty!\n';
    }

    if (this.clientSignUpDto.email.length === 0) {
      this.validationMessage += 'Email should not empty!\n';
    }

    if (this.clientSignUpDto.phoneNumber.length === 0) {
      this.validationMessage += 'Phone Number should not empty!\n';
    }

    if (this.clientSignUpDto.budget === 0) {
      this.validationMessage += 'Budget should not 0!\n';
    }

    if (this.clientSignUpDto.password.length < 7) {
      this.validationMessage += 'Password should have at length at least 7!\n';
    }

    if (this.clientSignUpDto.firstname.length === 0) {
      this.validationMessage += 'Firstname should not empty!\n';
    }

    if (this.clientSignUpDto.lastname.length === 0) {
      this.validationMessage += 'Lastname should not empty!\n';
    }

    if (this.clientSignUpDto.password !== this.clientConfirmPassword) {
      this.validationMessage += 'Passwords should match!';
    }

    return this.validationMessage === '';
  }

  private validateProvider(): boolean {
    this.validationMessage = '';

    if (this.providerSignUpDto.username.length < 6) {
      this.validationMessage += 'Username should have length at least 6 characters!\n';
    }

    if (this.providerSignUpDto.name.length === 0) {
      this.validationMessage += 'Name should not be empty!\n';
    }

    if (this.providerSignUpDto.email.length === 0) {
      this.validationMessage += 'Email should not be empty!\n';
    }

    if (this.providerSignUpDto.address.length === 0) {
      this.validationMessage += 'Address should not be empty!\n';
    }

    if (this.providerSignUpDto.password.length < 7) {
      this.validationMessage += 'Password should have at least 7 characters!\n';
    }

    if (this.providerSignUpDto.fiscalCode.length === 0) {
      this.validationMessage += 'Fiscal Code should not be empty!\n';
    }

    if (this.providerSignUpDto.offeredServices.length === 0) {
      this.validationMessage += 'Provider should offer at least one service\n';
    }

    if (this.providerSignUpDto.phoneNumber.length === 0) {
      this.validationMessage += 'Phone number should not be empty!\n';
    }

    if (this.providerSignUpDto.password !== this.clientConfirmPassword) {
      this.validationMessage += 'Passwords should match!';
    }

    return this.validationMessage === '';
  }

  public async completeResults(query: string) {
    const result = await this.mapsService.getAutocomplete(query);
    this.suggestions = result.predictions.map(place => place.description);
  }
}
