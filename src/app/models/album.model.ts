import {Genre} from "./genre.model";
import {Contributor} from "./contributor.model";
import {Track} from "./track.model";
import {Artist} from "./artist.model";

export interface Album {
    id: number;
    title: string;
    year: number;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    gender_id: number;
    genres: {
        data: Genre[];
    }
    label: string;
    nb_tracks: number;
    duration: number;
    fans: number;
    release_date: string;
    record_type: string;
    available: boolean;
    tracklist: string;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    contributors: Contributor[];
    artist: Artist;
    type: string;
    tracks: {
        data: Track[]
    };
}
