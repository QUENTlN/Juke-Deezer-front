import {Pipe, PipeTransform} from '@angular/core';
import {Artist} from "./models/artist.model";

@Pipe({
    name: 'featuring'
})
export class FeaturingPipe implements PipeTransform {

    transform(value: Artist[], ...args: unknown[]): unknown {
        if (value.length === 1) {
            return value[0].name;
        } else if (value.length > 1) {
            return value.map(artist => artist.name).join(', ');
        } else {
            return 'tba';
        }
    }

}
