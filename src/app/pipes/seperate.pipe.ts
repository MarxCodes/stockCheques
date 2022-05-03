import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seperate'
})
export class SeperatePipe implements PipeTransform {

  transform(text: string, ...args: unknown[]): string {
    return text.split(/(?=[A-Z])/).join(' ');
    // return null;
  }

}
