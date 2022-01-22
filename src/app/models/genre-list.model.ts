import {Genre} from "./genre.model";

export interface GenreList {
    data: Genre[];
    total: number;
    next: string;
}
