import {Album} from "./album.model";

export interface AlbumList {
  data: Album[];
  total: number;
  next: string;
}
