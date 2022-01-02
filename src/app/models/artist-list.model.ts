import {Artist} from "./artist.model";

export interface ArtistList {
  artists: Artist[];
  total: number;
  next: string;
}
