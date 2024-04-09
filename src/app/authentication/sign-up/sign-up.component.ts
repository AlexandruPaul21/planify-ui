import { Component, OnInit } from '@angular/core';
import { ClientSignUpDto } from '../../integration/domain/auth/ClientSignUpDto';
import { ProviderSignUpDto } from '../../integration/domain/auth/ProviderSignUpDto';
import { ServiceService } from '../../integration/service/service.service';
import { AuthenticationService } from '../../integration/service/auth/authentication.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ServiceDto } from '../../integration/domain/ServiceDto';

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
  ) {}

  public async onSignUpClicked(): Promise<void> {
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
          this.showErrorMessage();
          return;
      }
      await this.router.navigate(
        ['/login'],
        { queryParams: { afterSignUp: true } }
      );
    } catch (e) {
      this.showErrorMessage();
    }
  }

  private showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Sign up failed',
      detail: 'There was an error, try again later',
    });
  }

  public isSignUpEnabled(): boolean {
    switch (this.selectedOption) {
      case 'Client':
        return this.validateClient();
      case 'Provider':
        return this.validateProvider();
      case '':
        return false;
    }
  }

  // TODO
  private validateClient(): boolean {
    return this.clientSignUpDto.username.length > 0;
  }

  // TODO
  private validateProvider(): boolean {
    return this.providerSignUpDto.username.length > 0;
  }
}
