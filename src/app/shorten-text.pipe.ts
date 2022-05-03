import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(text: string, length: number = 14, suffix: string = '...'): string {
    console.log('typedof pipe:' ,typeof text)
    let revealed = text.split(' ').map((o,i) => i < 3 ? o : '').join(' ').trim();

    // if (text.length > length) {
    //   let truncated: string = text.substring(0, length).trim() + suffix;
    //   return truncated;
    // }

    // return text;
    return revealed
  }

  // take the string and beyond 20 characters replace with '...'


}
