import {Playlist} from "./playlist.model";

export interface PlaylistList {
    data: Playlist[];
    total: number;
    next: string;
}
