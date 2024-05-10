import { Component, OnInit } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss'],
  providers: [MessageService],
})
export class ClientContractsComponent implements OnInit {
  public contracts: ContractDto[] = [];
  public loading: boolean = false;

  public constructor(
    private contractService: ContractService,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    this.contracts = await this.contractService.getAllContractsByClientId(localStorage.getItem('id')!!);
    this.loading = false;
  }

  public async onClickContractRow(contract: ContractDto): Promise<void> {
    await this.router.navigate(['/contract/', contract.id]);
  }
}
