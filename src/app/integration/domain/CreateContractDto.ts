import { ServiceDto } from './ServiceDto';
import { ProviderDto } from './ProviderDto';
import { ClientDto } from './ClientDto';

export interface CreateContractDto {
  service: ServiceDto;
  provider: ProviderDto;
  client: ClientDto;
  price: number;
  advancePayment: number;
  clientNotes: string;
  contractDate: Date;
}
