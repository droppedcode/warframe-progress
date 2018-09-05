import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: number): any {
    let arr = [];
    for (let i = 0; i < value; ++i) {
      arr.push(i);
    }
    return arr;
  }

}
