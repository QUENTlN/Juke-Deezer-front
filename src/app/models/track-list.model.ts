import {Track} from "./track.model";

export interface TrackList {
  data: Track[];
  total: number;
  next: string;
}
