import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OpeningHoursToNumber pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'Openinghours',
})
export class Openinghours implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args?) {

    let newdate = value.split(":").join(".");
    let n;

    if(newdate.substring(0,1) == "0")
    {
      n = newdate.slice(1, 5);
    }
    else
    {
      n = newdate;
    }

    let m = Number(n);

    return m;
  }
}
