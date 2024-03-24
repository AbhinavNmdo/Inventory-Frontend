import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNestedValue'
})
export class GetNestedValuePipe implements PipeTransform {

  transform(value: object, ...args: any[]): unknown {
    const keys: string[] = args[0].split('.');
    let current: any = value;

    for (const key of keys) {
      if (current[key] === undefined || current[key] === null) {
        return '-:-';
      }
      current = current[key];
    }

    return current;
  }

}
