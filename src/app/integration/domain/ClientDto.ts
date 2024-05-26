import { ReviewDto } from './ReviewDto';

export interface ClientDto {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  budget: number;
  address: string;
  phoneNumber: string;
  reviews: Array<ReviewDto>;
  createdAt: Date;
}
