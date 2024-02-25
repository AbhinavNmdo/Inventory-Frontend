import { Pipe, PipeTransform } from '@angular/core';
import { AlertTypeEnum } from '../../enums/alert-type-enum';

@Pipe({
  name: 'alertClass'
})
export class AlertClassPipe implements PipeTransform {

  transform(value: AlertTypeEnum, ...args: any[]): string {
    if (value == AlertTypeEnum.primary) {
      return args[0] ? 'text-blue-400' : 'focus:ring-blue-400';
    }
    if (value == AlertTypeEnum.success) {
      return args[0] ? 'text-green-400' : 'focus:ring-green-400';
    }
    if (value == AlertTypeEnum.danger) {
      return args[0] ? 'text-red-400' : 'focus:ring-red-400';
    }
    if (value == AlertTypeEnum.warning) {
      return args[0] ? 'text-yellow-400' : 'focus:ring-yellow-400';
    }
    return '';
  }

}
