import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cmToMeters'
})
export class CmToMetersPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    const meters = value / 100;
    return `${meters} m`;
  }
}
