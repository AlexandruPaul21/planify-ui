import { ServiceDto } from './ServiceDto';
import { ReviewDto } from './ReviewDto';

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
  reviews: Array<ReviewDto>;
  createdAt: Date;
}
