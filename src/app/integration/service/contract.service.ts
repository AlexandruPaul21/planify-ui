import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { SERVER_URL } from '../../config/server-config';
import { ContractDto } from '../domain/ContractDto';
import { CreateContractDto } from '../domain/CreateContractDto';
import { ProviderContractDto } from '../domain/ProviderContractDto';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  public constructor(private http: HttpClient) {
  }

  public getAllActiveContractsByClientId(id: string): Promise<ContractDto[]> {
    return promiseFromObservable(this.http
      .get<ContractDto[]>(SERVER_URL + `/contracts/active/${ id }`, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllFinalizedContractsByClientId(id: string): Promise<ContractDto[]> {
    return promiseFromObservable(this.http
      .get<ContractDto[]>(SERVER_URL + `/contracts/finalized/${ id }`, { headers: getAuthorizedHeaders() }),
    );
  }

  public findById(id: string): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.get<ContractDto>(SERVER_URL + `/contracts/${ id }`, { headers: getAuthorizedHeaders() }),
    );
  }

  public updateContract(contract: ContractDto): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.put<ContractDto>(SERVER_URL + '/contracts/update', contract, { headers: getAuthorizedHeaders() }),
    );
  }

  public createContract(contractDto: CreateContractDto): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.post<ContractDto>(SERVER_URL + '/contracts/new', contractDto, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllContractDatesForProvider(providerId: string): Promise<string[]> {
    return promiseFromObservable(
      this.http.get<string[]>(SERVER_URL + `/contracts/provider/dates/${ providerId }`, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllContracts(providerId: string): Promise<ContractDto[]> {
    return promiseFromObservable(
      this.http.get<ContractDto[]>(SERVER_URL + `/contracts/provider/${ providerId }`, { headers: getAuthorizedHeaders() }),
    );
  }

  public findContractsByDate(date: Date, providerId: string): Promise<ContractDto[]> {
    return promiseFromObservable(
      this.http.post<ContractDto[]>(SERVER_URL + '/contracts/provider-date', <ProviderContractDto>{
        providerId,
        contractDate: date,
      }, { headers: getAuthorizedHeaders() })
    );
  }
}
