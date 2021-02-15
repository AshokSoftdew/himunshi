import { Pipe, PipeTransform } from '@angular/core';
import { ServerMatchMedia } from '@angular/flex-layout';

@Pipe({
  name: 'productfilter'
})
export class ProductfilterPipe implements PipeTransform {
  
  //Multiple column search
  // transform(value: any, searchTerm: any): any {
  //   return value.filter(function(search){
  //     return search.brand_name.toLowerCase().indexOf(searchTerm.toLowerCase()) >-1
  //   })
  // }
  //Multiple column search 
  transform(items: any, filter: any): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            console.log(keyName);
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      
    } else {
      return items;
    }
  
  }
}
