import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'hourMinSec'
})
export class HourMinSecPipe implements PipeTransform {

    transform(value: number | undefined, ...args: unknown[]): string {
        if (value === undefined) {
            return '';
        }
        let str: string = '';
        const hours = Math.floor(value / 3600);
        if (hours > 0) {
            str += hours + 'hours ';
        }
        const minutes = Math.floor((value - hours * 3600) / 60);
        if (minutes > 0) {
            str += minutes + 'min ';
        }
        const seconds = value - hours * 3600 - minutes * 60;
        str += seconds + 'sec';
        return str;
    }

}
