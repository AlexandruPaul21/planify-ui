import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { SERVER_URL } from '../../config/server-config';
import { ContractDto } from '../domain/ContractDto';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public constructor(private http: HttpClient) {}

  public getAllContractsByClientId(id: string): Promise<ContractDto[]> {
    return promiseFromObservable(this.http
      .get<ContractDto[]>(SERVER_URL + '/contracts/active/' + id, { headers: getAuthorizedHeaders()})
    );
  }
}
