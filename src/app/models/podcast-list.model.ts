import {Podcast} from "./podcast.model";

export interface PodcastList {
    data: Podcast[];
    total: number;
    next: string;
}
