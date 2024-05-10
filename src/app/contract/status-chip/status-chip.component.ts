import { Component, Input, OnInit } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import ContractStatusEnum = ContractDto.ContractStatusEnum;

@Component({
  selector: 'status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent implements OnInit{
  @Input() public status!: string;
  public statusToStatusChipUi = new Map<string, StatusChipUi>([
      ['ORDERED', {
        color: 'grey',
        icon: 'pi-shopping-cart',
        tooltip: 'Ordered'
      }],
      ['DECLINED_CLIENT', {
        color: 'red',
        icon: 'pi-exclamation-circle',
        tooltip: 'Declined by Client'
      }],
      ['DECLINED_PROVIDER', {
        color: 'red',
        icon: 'pi-exclamation-circle',
        tooltip: 'Declined by Provider'
      }],
      ['ACCEPTED_CLIENT', {
        color: 'green',
        icon: 'pi-check',
        tooltip: 'Accepted by Client'
      }],
      ['ACCEPTED_PROVIDER', {
        color: 'green',
        icon: 'pi-check',
        tooltip: 'Accepted by Provider'
      }],
      ['STARTED', {
        color: 'black',
        icon: 'pi-reply',
        tooltip: 'Started'
      }],
      ['FINISHED', {
        color: 'green',
        icon: 'pi-check-circle',
        tooltip: 'Finished'
      }],
      ['PAID', {
        color: 'grey',
        icon: 'pi-money-bill',
        tooltip: 'Paid'
      }],
      ['CANCELLED', {
        color: 'red',
        icon: 'pi-times-circle',
        tooltip: 'Cancelled'
      }],

    ]);

  public statusChipUi: StatusChipUi = this.statusToStatusChipUi.get(ContractStatusEnum.ORDERED)!!;

  public constructor() {}

  ngOnInit(): void {
    this.statusChipUi = this.statusToStatusChipUi.get(this.status)!!;
  }
}

export interface StatusChipUi {
  color: string;
  icon: string;
  tooltip: string;
}
