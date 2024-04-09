import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {
  public transform(value: number): string {
    return value === -1 ? 'N/A' : value.toString() + '/5';
  }

}
