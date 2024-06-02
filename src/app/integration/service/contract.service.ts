import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuthorizedHeaders, promiseFromObservable } from '../utils/rest-utils';
import { SERVER_URL } from '../../config/server-config';
import { ContractDto } from '../domain/ContractDto';
import { CreateContractDto } from '../domain/CreateContractDto';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  public constructor(private http: HttpClient) {}

  public getAllActiveContractsForClient(): Promise<ContractDto[]> {
    return promiseFromObservable(this.http
      .get<ContractDto[]>(`${SERVER_URL}/contracts/client/active/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public async generateInvoice(contractId: string): Promise<Blob> {
    return promiseFromObservable(this.http
    .get(`${SERVER_URL}/contracts/invoice/${contractId}/`, { responseType: 'blob', headers: getAuthorizedHeaders() }))
  }

  public getAllFinalizedContractsForClient(): Promise<ContractDto[]> {
    return promiseFromObservable(this.http
      .get<ContractDto[]>(`${SERVER_URL}/contracts/client/finalized/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public findById(contractId: string): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.get<ContractDto>(`${SERVER_URL}/contracts/${contractId}/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public updateContract(contract: ContractDto): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.put<ContractDto>(`${SERVER_URL}/contracts/update/`, contract, { headers: getAuthorizedHeaders() }),
    );
  }

  public createContract(contractDto: CreateContractDto): Promise<ContractDto> {
    return promiseFromObservable(
      this.http.post<ContractDto>(`${SERVER_URL}/contracts/new/`, contractDto, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllContractDatesForProvider(): Promise<string[]> {
    return promiseFromObservable(
      this.http.get<string[]>(`${SERVER_URL}/contracts/provider/dates/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllContractsByProviderId(): Promise<ContractDto[]> {
    return promiseFromObservable(
      this.http.get<ContractDto[]>(`${SERVER_URL}/contracts/provider/`, { headers: getAuthorizedHeaders() }),
    );
  }

  public getAllFinalizedContractsByProviderId(): Promise<ContractDto[]> {
    return promiseFromObservable(
      this.http.get<ContractDto[]>(`${SERVER_URL}/contracts/provider/finalized/`, { headers: getAuthorizedHeaders() }),
    );
  }
}
