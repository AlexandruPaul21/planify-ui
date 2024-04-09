import { ServiceDto } from './ServiceDto';

export interface EventDto {
  id: string;
  eventName: string;
  services: Array<ServiceDto>;
}
