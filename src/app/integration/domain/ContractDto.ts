import { ServiceDto } from './ServiceDto';
import { ProviderDto } from './ProviderDto';
import { ClientDto } from './ClientDto';

export interface ContractDto {
  id: string;
  status: ContractDto.ContractStatusEnum;
  providerApproved: boolean;
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
  export type ContractStatusEnum = "ORDERED" | "STARTED" | "FINISHED" | "PAID" | "DECLINED" | "CANCELLED";
  export const ContractStatusEnum = {
    ORDERED: 'ORDERED' as ContractStatusEnum,
    STARTED: 'STARTED' as ContractStatusEnum,
    FINISHED: "FINISHED" as ContractStatusEnum,
    PAID: "PAID" as ContractStatusEnum,
    DECLINED: "DECLINED" as ContractStatusEnum,
    CANCELLED: "CANCELLED" as ContractStatusEnum
  };
}
