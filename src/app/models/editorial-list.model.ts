import {Editorial} from "./editorial.model";

export interface EditorialList {
    data: Editorial[];
    total: number;
    next: string;
}
