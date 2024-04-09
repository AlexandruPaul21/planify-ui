import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientSignUpDto } from '../../domain/auth/ClientSignUpDto';
import { SERVER_URL } from '../../../config/server-config';
import { AuthenticationResponse } from '../../domain/auth/AuthenticationResponse';
import { promiseFromObservable } from '../../utils/rest-utils';
import { ProviderSignUpDto } from '../../domain/auth/ProviderSignUpDto';
import { SignInDto } from '../../domain/auth/SignInDto';
import { SignInResponse } from '../../domain/auth/SignInResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public clientSignUp(client: ClientSignUpDto): Promise<AuthenticationResponse> {
    return promiseFromObservable(
      this.http.post<AuthenticationResponse>(SERVER_URL + '/auth/client/sign-up', client)
    );
  }

  public providerSignUp(provider: ProviderSignUpDto): Promise<AuthenticationResponse> {
    return promiseFromObservable(
      this.http.post<AuthenticationResponse>(SERVER_URL + '/auth/provider/sign-up', provider)
    );
  }

  public signIn(signIn: SignInDto): Promise<SignInResponse> {
    return promiseFromObservable(this.http.post<SignInResponse>(SERVER_URL + '/auth/sign-in', signIn));
  }
}
