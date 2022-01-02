import {Episode} from "./episode.model";

export interface EpisodeList {
  data: Episode[];
  total: number;
  next: string;
}
