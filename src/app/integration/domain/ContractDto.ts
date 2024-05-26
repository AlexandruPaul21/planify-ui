import { ServiceDto } from './ServiceDto';
import { ProviderDto } from './ProviderDto';
import { ClientDto } from './ClientDto';

export interface ContractDto {
  id: string;
  status: ContractDto.ContractStatusEnum;
  service: ServiceDto;
  provider: ProviderDto;
  client: ClientDto;
  price: number;
  advancePayment: number;
  providerNotes: string;
  clientNotes: string;
  contractDate: Date;
}

export namespace ContractDto {
  export type ContractStatusEnum = 'ORDERED'
    | 'DECLINED_PROVIDER'
    | 'DECLINED_CLIENT'
    | 'ACCEPTED_PROVIDER'
    | 'ACCEPTED_CLIENT'
    | 'STARTED'
    | 'FINISHED'
    | 'PAID'
    | 'CANCELLED';
  export const ContractStatusEnum = {
    ORDERED: 'ORDERED' as ContractStatusEnum,
    STARTED: 'STARTED' as ContractStatusEnum,
    FINISHED: "FINISHED" as ContractStatusEnum,
    PAID: "PAID" as ContractStatusEnum,
    DECLINED_CLIENT: 'DECLINED_CLIENT' as ContractStatusEnum,
    DECLINED_PROVIDER: 'DECLINED_PROVIDER' as ContractStatusEnum,
    ACCEPTED_CLIENT: 'ACCEPTED_CLIENT' as ContractStatusEnum,
    ACCEPTED_PROVIDER: 'ACCEPTED_PROVIDER' as ContractStatusEnum,
    CANCELLED: 'CANCELLED' as ContractStatusEnum
  };
}
