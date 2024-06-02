import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../integration/service/contract.service';
import { ContractDto } from '../../integration/domain/ContractDto';
import { Router } from '@angular/router';
import { LoadingSpinnerStore } from '../../reactivity/store/loading-spinner.store';

@Component({
  selector: 'app-provider-calendar',
  templateUrl: './provider-calendar.component.html',
  styleUrls: ['./provider-calendar.component.scss'],
})
export class ProviderCalendarComponent implements OnInit {
  public selectedDate: Date = new Date();
  public dates: Date[] = [];
  public loading: boolean = false;

  public contracts: ContractDto[] = [];
  public visibleContracts: ContractDto[] = [];

  public constructor(
    private contractService: ContractService,
    private loadingSpinnerStore: LoadingSpinnerStore,
    private router: Router,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loadingSpinnerStore.update({ loading: true });
    this.dates = (await this.contractService.getAllContractDatesForProvider()).map(date => new Date(date));
    this.contracts = await this.contractService.getAllContractsByProviderId();
    await this.onDateChange();
    this.loadingSpinnerStore.update( { loading: false });
  }

  public containsDate(date: any): boolean {
    return this.dates.find((actualDate) => this.equalDateToAny(actualDate, date)) != null;
  }

  private equalDateToAny(date1: Date, date2: any): boolean {
    return date1.getFullYear() === date2.year &&
      date1.getMonth() === date2.month &&
      date1.getDate() === date2.day;
  }

  private equalDateToDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  public async onClickContractRow(contract: ContractDto): Promise<void> {
    await this.router.navigate(['/contract/', contract.id]);
  }

  public async onDateChange(): Promise<void> {
    this.visibleContracts = this.contracts.filter(contract => this.equalDateToDate(this.selectedDate, new Date(contract.contractDate)));
  }
}
