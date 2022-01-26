import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Track} from "../../models/track.model";
import {faPlay} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

    public faPlay = faPlay;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit(): void {
    }

    getNextTracks(): Track[] {
        return [...this.playerService.queue].splice(this.playerService.currentIndex);
    }

    jumpTo(index: number) {
        this.playerService.jumpTo(this.playerService.currentIndex + index);
    }
}
