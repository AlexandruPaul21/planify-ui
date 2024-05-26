import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacePredictionDto } from '../domain/google-maps/PlacePredictionDto';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { SERVER_URL } from '../../config/server-config';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  public constructor(
    private http: HttpClient,
  ) {}

  public getAutocomplete(input: string): Promise<PlacePredictionDto> {
    return promiseFromObservable(
      this.http.get<PlacePredictionDto>(`${SERVER_URL}/map/${input}`, { headers: getAuthorizedHeaders() }),
    );
  }
}
