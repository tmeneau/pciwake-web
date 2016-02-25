import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({ name: 'password' })
export class PasswordCovnertPipe implements PipeTransform {
  transform(value: string, args: any[]) {
    if(value) {
      return value.replace(/./g, '*');
    }
    return;
  }
}