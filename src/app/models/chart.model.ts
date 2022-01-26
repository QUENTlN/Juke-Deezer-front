import {Track} from "./track.model";
import {Album} from "./album.model";
import {Artist} from "./artist.model";
import {Playlist} from "./playlist.model";
import {Podcast} from "./podcast.model";

export interface Chart {
    tracks: {
        data: Track[];
    },
    albums: {
        data: Album[];
    },
    artists: {
        data: Artist[];
    },
    playlists: {
        data: Playlist[];
    },
    podcasts: {
        data: Podcast[];
    },
    data: Album[];


}
