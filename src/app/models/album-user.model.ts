import {Artist} from "./artist.model";
import {Album} from "./album.model";

export interface AlbumUser  {
    id: number,
    readable: boolean,
    title: string,
    duration: number,
    rank: number,
    explicit_lyrics: boolean,
    explicit_content_lyrics: string,
    explicit_content_cover: number,
    preview: string,
    md5_image: string,
    artist: Artist,
    album: Album
}
