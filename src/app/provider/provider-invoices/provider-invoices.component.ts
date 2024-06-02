import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';
import { Router } from '@angular/router';
import { downloadFile } from '../../integration/utils/rest-utils';

@Component({
  selector: 'app-provider-invoices',
  templateUrl: './provider-invoices.component.html',
  styleUrls: ['./provider-invoices.component.scss'],
})
export class ProviderInvoicesComponent implements OnInit {
  public contracts: ContractDto[] = [];

  public constructor(
    private loadingSpinnerStore: LoadingSpinnerStore,
    private contractService: ContractService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update({ loading: true });
    this.contracts = await this.contractService.getAllFinalizedContractsByProviderId();
    this.loadingSpinnerStore.update({ loading: false });
  }

  public async downloadInvoicePressed(contractId: string) {
    this.loadingSpinnerStore.update({ loading: true });
    const invoice = await this.contractService.generateInvoice(contractId);
    downloadFile(invoice);
    this.loadingSpinnerStore.update({ loading: false });
  }
}
