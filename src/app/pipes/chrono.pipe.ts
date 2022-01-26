import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'chrono'
})
export class ChronoPipe implements PipeTransform {

    transform(value: number | undefined, ...args: unknown[]): string {
        if (value === undefined) {
            return '-';
        }
        let str: string = "";
        const hours = Math.floor(value / 3600);
        if (hours > 0) {
            str += hours + ":";
        }
        const minutes = Math.floor(value % 3600 / 60);
        if (minutes < 10 && hours > 0) {
            str += "0";
        }
        str += minutes + ":";
        const secondes = Math.floor(value % 3600 % 60);
        if (secondes < 10) {
            str += "0";
        }
        return str + secondes;
    }

}
