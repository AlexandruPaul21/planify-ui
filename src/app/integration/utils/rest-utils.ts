import { lastValueFrom, Observable, take } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";

export function promiseFromObservable<T>(observable: Observable<T>): Promise<T> {
  return lastValueFrom(observable.pipe(take(1)));
}

export function getAuthorizedHeaders(): HttpHeaders {
  return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
}
