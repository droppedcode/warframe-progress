import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from '../../data/progress/ItemType';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      return value.replace(/\n/g, '<br/>');
    }
    return value;
  }

}
