import {Person} from "./person.model";

export interface Contributor extends Person {
    role: string;
}
