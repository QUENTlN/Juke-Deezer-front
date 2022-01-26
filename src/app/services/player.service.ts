import {Injectable} from '@angular/core';
import {Track} from "../models/track.model";
import {Album} from "../models/album.model";
import {Subject} from "rxjs";
import {Artist} from "../models/artist.model";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    public queue: Track[] = [];

    public originalQueue: Track[] = [];

    public favoriteTracks: Track[] = [];

    public favoriteAlbums: Album[] = [];

    public favoriteArtists: Artist[] = [];

    public currentIndex: number = 0;

    private updatePlayer = new Subject();

    public getPlayerUpdate() {
        return this.updatePlayer.asObservable();
    }

    public getCurrentTrack(): Track {
        return this.queue[this.currentIndex];
    }

    public getPreviousTrack(): Track | null {
        if (this.currentIndex > 0) {
            return this.queue[--this.currentIndex];
        }
        return null;
    }

    public getNextTrack(): Track | null {
        if (this.currentIndex < this.queue.length - 1) {
            return this.queue[++this.currentIndex];
        }
        return null;
    }

    public shuffle(): void {
        this.originalQueue = [...this.queue];
        this.queue = [...this.queue].splice(0, this.currentIndex + 1).concat([...this.queue].splice(this.currentIndex + 1).sort((a, b) => 0.5 - Math.random()));
    }

    public unshuffle(): void {
        this.currentIndex = this.originalQueue.findIndex(track => track.id == this.queue[this.currentIndex].id);
        this.queue = [...this.originalQueue];
    }

    public setAlbum(album: Album) {
        album.tracks.data.forEach(track => {
            track.album = album;
        });
        this.queue = album.tracks.data;
        this.currentIndex = 0;
    }

    public setTrackList(tracks: Track[]) {
        this.queue = tracks;
        this.currentIndex = 0;
    }

    isCurrentTrackFavorite() {
        return this.favoriteTracks.findIndex(track => track.id == this.queue[this.currentIndex].id) > -1;
    }

    jumpTo(index: number) {
        this.currentIndex = index;
        this.updatePlayer.next(true);
    }
}
