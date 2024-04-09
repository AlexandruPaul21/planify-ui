import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../config/server-config';
import { ServiceDto } from '../domain/ServiceDto';
import { promiseFromObservable } from '../utils/rest-utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public constructor(private http: HttpClient) {}

  public getAllServices(): Promise<ServiceDto[]> {
    return promiseFromObservable(this.http.get<ServiceDto[]>(SERVER_URL + '/services'));
  }
}
