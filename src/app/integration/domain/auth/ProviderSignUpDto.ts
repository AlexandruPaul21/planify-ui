import { ServiceDto } from '../ServiceDto';

export interface ProviderSignUpDto {
  name: string;
  fiscalCode: string;
  username: string;
  email: string;
  address: string;
  offeredServices: Array<ServiceDto>,
  phoneNumber: string;
  password: string;
}
