import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ClientDto } from "../domain/ClientDto";
import { getAuthorizedHeaders, promiseFromObservable } from "../utils/rest-utils";
import { SERVER_URL } from "../../config/server-config";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    public constructor(private http: HttpClient) {
    }

    public getById(id: string): Promise<ClientDto> {
        return promiseFromObservable(this.http
            .get<ClientDto>(SERVER_URL + `/clients/${ id }`, { headers: getAuthorizedHeaders() })
        );
    }

    public update(id: string, clientDto: ClientDto): Promise<ClientDto> {
        return promiseFromObservable(this.http
            .put<ClientDto>(SERVER_URL + `/clients/${ id }`, clientDto, { headers: getAuthorizedHeaders() })
        );
    }
}
