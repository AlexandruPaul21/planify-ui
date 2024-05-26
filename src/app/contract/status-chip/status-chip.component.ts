import { Component, Input, OnChanges } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import ContractStatus = ContractDto.ContractStatusEnum;
import { StatusChipUi, statusToStatusChipUi } from '../util/status-utils';

@Component({
  selector: 'status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent implements OnChanges {
  @Input() public status!: ContractStatus;
  public statusChipUi: StatusChipUi = statusToStatusChipUi.get(ContractStatus.ORDERED)!!;

  public constructor() {}

  public ngOnChanges(): void {
    this.statusChipUi = statusToStatusChipUi.get(this.status)!!;
  }
}
