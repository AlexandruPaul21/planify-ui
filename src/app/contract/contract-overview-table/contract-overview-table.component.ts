import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';

@Component({
  selector: 'app-contract-overview-table',
  templateUrl: './contract-overview-table.component.html',
  styleUrls: ['./contract-overview-table.component.scss']
})
export class ContractOverviewTableComponent implements OnInit{
  public actualRole: 'PROVIDER' | 'CLIENT' | null = null;

  public contracts: ContractDto[] = [];
  public loading: boolean = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
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
    const entityId = localStorage.getItem('id')!!;

    this.route.paramMap.subscribe(async params => {
      this.loading = true;

      const status = params.get('status');

      if (status == null) {
        this.contracts = await this.contractService.getAllContracts(entityId);
        this.loading = false;
        return;
      }

      if (status === 'finished') {
        this.contracts = await this.contractService.getAllFinalizedContractsByClientId(entityId);
      } else {
        this.contracts = await this.contractService.getAllActiveContractsByClientId(entityId);
      }
      this.loading = false;
    });
  }

  public async onClickContractRow(contract: ContractDto): Promise<void> {
    await this.router.navigate(['/contract/', contract.id]);
  }
}
