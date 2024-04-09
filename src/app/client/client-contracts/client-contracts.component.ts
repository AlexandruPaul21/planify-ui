import { Component, OnInit } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.scss']
})
export class ClientContractsComponent implements OnInit {
  public contracts: ContractDto[] = [];

  public constructor(
    private contractService: ContractService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.contracts = await this.contractService.getAllContractsByClientId(localStorage.getItem('id')!!);
  }
}
