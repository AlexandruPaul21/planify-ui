import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractReviewStateDto } from '../domain/ContractReviewStateDto';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { SERVER_URL } from '../../config/server-config';
import { CreateReviewDto } from '../domain/CreateReviewDto';
import { ReviewDto } from '../domain/ReviewDto';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  public constructor(private http: HttpClient) {}

  public getReviewStateByContractId(id: string): Promise<ContractReviewStateDto> {
    return promiseFromObservable(this.http
      .get<ContractReviewStateDto>(`${SERVER_URL}/reviews/check/${id}/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public createClientReview(createClientReviewDto: CreateReviewDto): Promise<ReviewDto> {
    return promiseFromObservable(this.http
      .post<ReviewDto>(`${SERVER_URL}/reviews/client/`, createClientReviewDto, { headers: getAuthorizedHeaders() }),
    );
  }

  public createProviderReview(createReviewDto: CreateReviewDto): Promise<ReviewDto> {
    return promiseFromObservable(this.http
      .post<ReviewDto>(`${SERVER_URL}/reviews/provider/`, createReviewDto, { headers: getAuthorizedHeaders() }),
    )
  }

  public deleteReview(id: string): Promise<void> {
    return promiseFromObservable(this.http
      .delete<void>(`${SERVER_URL}/reviews/${id}/`, { headers: getAuthorizedHeaders() }),
    );
  }
}
