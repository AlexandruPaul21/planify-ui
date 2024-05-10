import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { promiseFromObservable } from '../../integration/utils/rest-utils';
import { ProviderDto } from '../../integration/domain/ProviderDto';
import { ProviderService } from '../../integration/service/provider.service';
import { MessageService } from 'primeng/api';
import { CreateContractDto } from '../../integration/domain/CreateContractDto';
import { ClientService } from '../../integration/service/client.service';
import { ContractService } from '../../integration/service/contract.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-contract-page',
  templateUrl: './new-contract-page.component.html',
  styleUrls: ['./new-contract-page.component.scss'],
  providers: [MessageService],
})
export class NewContractPageComponent implements OnInit {
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
    rating: 0,
    createdAt: new Date()
  };

  public contract: CreateContractDto = {
    service: {
      id: '',
      serviceName: '',
      createdAt: new Date(),
    },
    provider: this.provider,
    client: {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      phoneNumber: '',
      rating: 0,
      budget: 0,
      createdAt: new Date(),
    },
    price: 0,
    advancePayment: 0,
    clientNotes: '',
    contractDate: new Date(),
  }
  public validationMessage = '';
  public loading: boolean = false;

  public constructor(
    private providerService: ProviderService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private messageService: MessageService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    const clientId = localStorage.getItem('id');

    if (clientId == null) {
      this.loading = false;
      await this.router.navigate(['/login']);
      return ;
    }

    this.contract.client = await this.clientService.getById(clientId);

    const q = await promiseFromObservable(this.route.queryParams);

    if (q['username'] != null) {
      this.provider = await this.providerService.getByUsername(q['username']);
      this.contract.provider = this.provider;
    }

    this.loading = false;
  }

  public isSaveEnabled(): boolean {
    this.validationMessage = '';

    if (this.contract.service.serviceName === '') {
      this.validationMessage += 'A service must be selected!\n';
    }

    if (this.contract.price < 1) {
      this.validationMessage += 'Price must be at least 1!\n';
    }

    if (this.contract.price < this.contract.advancePayment) {
      this.validationMessage += 'The advance payment must be lower than the full price!\n';
    }

    if (this.contract.contractDate < new Date()) {
      this.validationMessage += 'The contract cannot have a past date!\n';
    }

    return this.validationMessage === '';
  }

  public async onSaveClicked(): Promise<void> {
    this.loading = true;
    try {
      await this.contractService.createContract(this.contract);
    } catch (e: unknown) {
      if (e instanceof HttpErrorResponse && e.status === 403) {
        await this.router.navigate(['/login']);
      }
    } finally {
      this.loading = false;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Contract created successfully',
      detail: 'After provider approves it, you will be able to continue'
    });
  }
}
