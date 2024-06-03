import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';
import { Subscription } from 'rxjs';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';
import { MessageService } from 'primeng/api';
import { promiseFromObservable } from '../../integration/utils/rest-utils';

@Component({
  selector: 'app-contract-overview-table',
  templateUrl: './contract-overview-table.component.html',
  styleUrls: ['./contract-overview-table.component.scss'],
  providers: [MessageService],
})
export class ContractOverviewTableComponent implements OnInit, OnDestroy {
  public actualRole: 'PROVIDER' | 'CLIENT' | null = null;

  public contracts: ContractDto[] = [];
  private paramMapSubscription: Subscription | null = null;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private loadingSpinnerStore: LoadingSpinnerStore,
    private messageService: MessageService,
  ) {
    const role = localStorage.getItem('role')!!;
    if (role === 'PROVIDER') {
      this.actualRole = 'PROVIDER';
    }

    if (role === 'CLIENT') {
      this.actualRole = 'CLIENT';
    }
  }

  public async ngOnInit(): Promise<void> {
    const queryParams = await promiseFromObservable(this.route.queryParams);

    if (queryParams['contractSuccess'] != null) {
      this.messageService.add({
        severity: 'success',
        summary: 'Contract created successfully',
        detail: 'After provider approves it, you will be able to continue'
      });
    }

    this.paramMapSubscription = this.route.paramMap.subscribe(async params => {
      this.loadingSpinnerStore.update( { loading: true });

      const status = params.get('status');

      if (status == null) {
        this.contracts = await this.contractService.getAllContractsByProviderId();
        this.loadingSpinnerStore.update( { loading: false });
        return;
      }

      if (status === 'finished') {
        this.contracts = await this.contractService.getAllFinalizedContractsForClient();
      } else {
        this.contracts = await this.contractService.getAllActiveContractsForClient();
      }
      this.loadingSpinnerStore.update( { loading: false });
    });
  }

  public ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }

  public async onClickContractRow(contract: ContractDto): Promise<void> {
    await this.router.navigate(['/contract/', contract.id]);
  }
}
