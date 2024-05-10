import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripUnderscore',
})
export class StripUnderscorePipe implements PipeTransform {
  public transform(value: string, ...args: unknown[]): string {
    return value.toString().replace('_', ' ');
  }
}
