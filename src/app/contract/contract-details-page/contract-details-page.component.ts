import { Component, OnInit } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contract-details-page',
  templateUrl: './contract-details-page.component.html',
  styleUrls: ['./contract-details-page.component.scss'],
  providers: [MessageService],
})
export class ContractDetailsPageComponent implements OnInit{
  public contract: ContractDto | null = null;
  public loading: boolean = false;

  public constructor(
    private contractService: ContractService,
    private route: ActivatedRoute,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id')!!;
    this.contract = await this.contractService.findById(id);
    this.contract.contractDate = new Date(this.contract.contractDate);
    this.loading = false;
  }
}
