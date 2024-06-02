import { lastValueFrom, Observable, take } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";

export function promiseFromObservable<T>(observable: Observable<T>): Promise<T> {
  return lastValueFrom(observable.pipe(take(1)));
}

export function getAuthorizedHeaders(): HttpHeaders {
  return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
}

export function downloadFile(file: Blob) {
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoice.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
}
