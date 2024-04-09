import { ServiceDto } from './ServiceDto';

export interface ProviderDto {
  id: string;
  username: string;
  name: string;
  fiscalCode: string;
  email: string;
  address: string;
  phoneNumber: string;
  offeredServices: Array<ServiceDto>;
  revenue: number;
  rating: number;
  createdAt: Date;
}
