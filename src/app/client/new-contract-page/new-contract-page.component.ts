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
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';
import { ContractDto } from "../../integration/domain/ContractDto";

@Component({
  selector: 'app-new-contract-page',
  templateUrl: './new-contract-page.component.html',
  styleUrls: ['./new-contract-page.component.scss'],
  providers: [MessageService],
})
export class NewContractPageComponent implements OnInit {
  protected readonly ContractDto = ContractDto;
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
      reviews: [],
      phoneNumber: '',
      budget: 0,
      createdAt: new Date(),
    },
    price: 0,
    advancePayment: 0,
    clientNotes: '',
    contractDate: new Date(),
  }
  public validationMessage = '';

  public constructor(
    private providerService: ProviderService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private loadingSpinnerStore: LoadingSpinnerStore,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update( { loading: true });
    this.contract.client = await this.clientService.getCurrentClient();

    const q = await promiseFromObservable(this.route.queryParams);

    if (q['username'] != null) {
      this.provider = await this.providerService.getByUsername(q['username']);
      this.contract.provider = this.provider;
    }

    this.loadingSpinnerStore.update( { loading: false });
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
    this.loadingSpinnerStore.update( { loading: true });

    try {
      await this.contractService.createContract(this.contract);
      await this.router.navigate(['/client/contracts/progress'], { queryParams: { contractSuccess: true } });
    } catch (e: unknown) {
      if (e instanceof HttpErrorResponse && e.status === 403) {
        await this.router.navigate(['/login']);
      }
    } finally {
      this.loadingSpinnerStore.update( { loading: false });
    }
  }
}
