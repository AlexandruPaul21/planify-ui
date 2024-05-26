import { ContractDto } from '../../integration/domain/ContractDto';
import ContractStatus = ContractDto.ContractStatusEnum

export interface StatusChipUi {
  color: string;
  icon: string;
  tooltip: string;
  buttonLabel: string;
  buttonSeverity: string;
}

export const statusToStatusChipUi = new Map<ContractStatus, StatusChipUi>([
  [ContractStatus.ORDERED, {
    color: 'grey',
    icon: 'pi-shopping-cart',
    tooltip: 'Ordered',
    buttonLabel: 'Order',
    buttonSeverity: 'secondary'
  }],
  [ContractStatus.DECLINED_CLIENT, {
    color: 'red',
    icon: 'pi-exclamation-circle',
    tooltip: 'Declined by Client',
    buttonLabel: 'Decline',
    buttonSeverity: 'danger'
  }],
  [ContractStatus.DECLINED_PROVIDER, {
    color: 'red',
    icon: 'pi-exclamation-circle',
    tooltip: 'Declined by Provider',
    buttonLabel: 'Decline',
    buttonSeverity: 'danger'
  }],
  [ContractStatus.ACCEPTED_CLIENT, {
    color: 'green',
    icon: 'pi-check',
    tooltip: 'Accepted by Client',
    buttonLabel: 'Accept',
    buttonSeverity: 'success'
  }],
  [ContractStatus.ACCEPTED_PROVIDER, {
    color: 'green',
    icon: 'pi-check',
    tooltip: 'Accepted by Provider',
    buttonLabel: 'Accept',
    buttonSeverity: 'success'
  }],
  [ContractStatus.STARTED, {
    color: 'black',
    icon: 'pi-reply',
    tooltip: 'Started',
    buttonLabel: 'Start',
    buttonSeverity: 'plain'
  }],
  [ContractStatus.FINISHED, {
    color: 'green',
    icon: 'pi-check-circle',
    tooltip: 'Finished',
    buttonLabel: 'Finish',
    buttonSeverity: 'success'
  }],
  [ContractStatus.PAID, {
    color: 'grey',
    icon: 'pi-money-bill',
    tooltip: 'Paid',
    buttonLabel: 'Pay',
    buttonSeverity: 'secondary'
  }],
  [ContractStatus.CANCELLED, {
    color: 'red',
    icon: 'pi-times-circle',
    tooltip: 'Cancelled',
    buttonLabel: 'Cancel',
    buttonSeverity: 'danger'
  }],

]);
