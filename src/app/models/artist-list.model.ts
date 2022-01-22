import {Artist} from "./artist.model";

export interface ArtistList {
    data: Artist[];
    total: number;
    next: string;
}
