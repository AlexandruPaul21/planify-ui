import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import { StatusChipUi, statusToStatusChipUi } from '../util/status-utils';
import ContractStatus = ContractDto.ContractStatusEnum;

@Component({
  selector: 'transition-button',
  templateUrl: './transition-button.component.html',
  styleUrls: ['./transition-button.component.scss']
})
export class TransitionButtonComponent implements OnChanges {
  @Input()
  public toStatus!: ContractStatus;
  public statusChipUi: StatusChipUi = statusToStatusChipUi.get(ContractStatus.ORDERED)!!;

  @Output()
  public onClick = new EventEmitter();

  public constructor() {}

  public ngOnChanges(): void {
    this.statusChipUi = statusToStatusChipUi.get(this.toStatus)!!;

    if (localStorage.getItem('role') === 'PROVIDER' && this.toStatus === ContractStatus.PAID) {
      this.statusChipUi.buttonLabel = 'Mark as Paid'
    }
  }
}
