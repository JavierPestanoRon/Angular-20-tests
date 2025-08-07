import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gramsToKg'
})
export class GramsToKgPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    const kg = value / 1000;
    return `${kg} kg`;
  }
}
