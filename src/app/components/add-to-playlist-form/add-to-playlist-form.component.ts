import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../models/track.model";
import {DeezerService} from "../../services/deezer.service";
import {PlaylistList} from "../../models/playlist-list.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'app-add-to-playlist-form',
    templateUrl: './add-to-playlist-form.component.html',
    styleUrls: ['./add-to-playlist-form.component.scss']
})
export class AddToPlaylistFormComponent implements OnInit {

    @Input() tracksToAdd: Track[] = [];

    public playlists: PlaylistList | undefined;

    public form = new FormGroup({});

    constructor(private deezerService: DeezerService) {
    }

    async ngOnInit() {
        this.deezerService.getPlaylistsByUser().subscribe(playlists => {
            this.playlists = playlists;
            playlists.data.forEach(playlist => {
                this.form.addControl(playlist.id.toString(),new FormControl(false))
            });
        });
    }

    isDarkTheme() {
        return ThemeService.getTheme() == 'dark';
    }

    onSubmit() {
        const tracksToAdd = this.tracksToAdd.map(track => track.id);

        this.playlists?.data.filter(p=>this.form.get(p.id.toString())?.value)
            .forEach(p=>{
            this.deezerService.addTracksToPlaylist(p.id,tracksToAdd).subscribe(()=>{});
        });
    }

    getPlaylistLenght(): number {
        return <number>this.playlists?.data.length;
    }
}
