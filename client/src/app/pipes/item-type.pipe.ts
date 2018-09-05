import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from '../../data/progress/ItemType';

@Pipe({
  name: 'itemType'
})
export class ItemTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return ItemType[value];
  }

}
