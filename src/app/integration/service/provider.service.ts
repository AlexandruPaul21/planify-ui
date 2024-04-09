import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProviderDto } from "../domain/ProviderDto";
import { getAuthorizedHeaders, promiseFromObservable } from "../utils/rest-utils";
import { SERVER_URL } from "../../config/server-config";
import { ServiceDto } from '../domain/ServiceDto';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(private http: HttpClient) {
    }

    public getById(id: string): Promise<ProviderDto> {
        return promiseFromObservable(this.http
            .get<ProviderDto>(SERVER_URL + `/providers/${ id }`, { headers: getAuthorizedHeaders() })
        );
    }

    public update(id: string, providerDto: ProviderDto): Promise<ProviderDto> {
        return promiseFromObservable(this.http
            .put<ProviderDto>(SERVER_URL + `/providers/${ id }`, providerDto, { headers: getAuthorizedHeaders() })
        );
    }

    public getByServiceOffered(service: ServiceDto): Promise<ProviderDto[]> {
      return promiseFromObservable(this.http
            .post<ProviderDto[]>(SERVER_URL + '/providers/fetch/filter/service', service, { headers: getAuthorizedHeaders()})
      );
    }
}
