import {Artist} from "./artist.model";
import {Album} from "./album.model";

export interface Track {
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    unseen: boolean;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    preview: string;
    time_add: number;
    contributors: Artist[];
    artist: Artist;
    type: string;
    album: Album;
}
