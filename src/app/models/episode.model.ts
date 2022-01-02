import {Podcast} from "./podcast.model";

export interface Episode {
    id: number;
    title: string;
    description: string;
    available: boolean;
    release_date: string;
    duration: number;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    podcast: Podcast;
}
