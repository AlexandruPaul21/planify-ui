import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { EventDto } from '../domain/EventDto';
import { SERVER_URL } from '../../config/server-config';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public constructor(private http: HttpClient) {}

  public getAllEvents() {
    return promiseFromObservable(this.http
      .get<EventDto[]>(SERVER_URL + '/events', { headers: getAuthorizedHeaders() }),
    );
  }
}
