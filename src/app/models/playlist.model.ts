import {User} from "./user.model";
import {Track} from "./track.model";

export interface Playlist {
    id: number;
    title: string;
    description: string;
    duration: number;
    public: boolean;
    is_loved_track: boolean;
    collaborative: boolean;
    nb_tracks: number;
    unseen_track_count: number;
    fans: number;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    checksum: string;
    creator: User;
    tracks: {
        data: Track[];
    };
}
