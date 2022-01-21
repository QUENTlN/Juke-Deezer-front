import {Person} from "./person.model";

export interface Artist extends Person {
    nb_album: number;
    nb_fans: number;
}
