import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import {DeezerService} from "../../services/deezer.service";
import {PlayerService} from "../../services/player.service";
import {ThemeService} from "../../services/theme.service";
import {Location} from '@angular/common';
import {firstValueFrom, Subject} from "rxjs";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    @ViewChild('audioPlayer', {static: true}) audioPlayer: ElementRef | any;

    fasHeart = fasHeart;
    farHeart = farHeart;

    totalAudioLength: number = 0;
    currentAudioTime: number = 0;
    isAudioLoaded: boolean = false;
    isAudioPlaying: boolean = false;
    isRepeat: boolean = false;
    audioVolume: number = 100;
    isAudioEnded: Subject<any> = new Subject;
    isMute: boolean = false;

    selectedAudio: any;
    repeatActive: boolean = false;
    isError: boolean = true;
    isShuffle: boolean = false;
    volumeBeforeMute: number = 0.5;
    isTrackListOpen: boolean = false;

    constructor(private playerService: PlayerService, private deezerService: DeezerService, private location: Location) {
    }

    async ngOnInit() {
        // console.log(await firstValueFrom(this.deezerService.getTrack(3135556)))

        this.playerService.favoriteTracks = (await firstValueFrom(this.deezerService.getFavoriteTracks())).data;

        // let album = await firstValueFrom(this.deezerService.getAlbum(69352202))
        // console.log(album);
        // this.playerService.setAlbum(album);

        this.playerService.getPlayerUpdate().subscribe(async (data) => {
            this.selectedAudio = this.playerService.getCurrentTrack();
            this.audioPlayer.nativeElement.currentTime = 0;
            this.play();
            this.isError = false;
        });

        this.audioPlayer.nativeElement.addEventListener('playing', () => {
        });

        this.audioPlayer.nativeElement.addEventListener('loadeddata', () => {
            this.isAudioLoaded = true;
            this.getAudioLength();
        });

        this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
            this.currentAudioTime = Math.floor(this.audioPlayer.nativeElement.currentTime);
            if (this.audioPlayer.nativeElement.ended) {
                this.isAudioEnded.next(true);
            }
        });

        this.audioPlayer.nativeElement.addEventListener('volumechange', () => {
            this.audioVolume = Math.floor(this.audioPlayer.nativeElement.volume * 100);
            this.isMute = this.audioVolume == 0;
        })

        if (this.playerService.queue.length <= 0) {
            this.isError = true;
        } else {
            this.selectedAudio = this.playerService.getCurrentTrack();
        }

        this.isAudioEnded.subscribe(data => {
            if (!this.isRepeat && this.playerService.queue.length > 0) {
                this.nextAudio();
            }
        })
    }

    public isLoggedIn(): boolean {
        return DeezerService.isLoggedIn();
    }

    public getTheme(): string {
        return ThemeService.getTheme();
    }

    public play() {
        this.isAudioPlaying = true;
        setTimeout(() => {
            this.audioPlayer.nativeElement.play();
        }, 0);
    }

    public pause() {
        this.isAudioPlaying = false;
        setTimeout(() => {
            this.audioPlayer.nativeElement.pause();
        }, 0);
    }

    public getAudioLength() {
        this.totalAudioLength = Math.floor(this.audioPlayer.nativeElement.duration);
    }

    public nextAudio() {
        if (this.playerService.queue.length - 1 != this.playerService.currentIndex) {
            this.selectedAudio = this.playerService.getNextTrack();
            this.getAudioLength();
            if (this.isAudioPlaying) {
                this.play();
            }
        } else {
            this.pause();
        }
    }

    public previousAudio() {
        if (this.playerService.currentIndex != 0) {
            this.selectedAudio = this.playerService.getPreviousTrack();
            this.getAudioLength();
            if (this.isAudioPlaying) {
                this.play();
            }
        }
    }

    public seekAudio(seekAudioValue: any) {
        if (this.audioVolume != 0) {
            this.isMute = false;
        }
        this.audioPlayer.nativeElement.currentTime = seekAudioValue.target.value;
    }

    public repeatAudio() {
        this.isRepeat = !this.isRepeat;
        this.repeatActive = !this.repeatActive;
        this.audioPlayer.nativeElement.loop = this.isRepeat;
    }

    public shuffleAudio() {
        this.isShuffle = !this.isShuffle;
        if (this.isShuffle) {
            this.playerService.shuffle();
        } else {
            this.playerService.unshuffle();
        }
    }

    public volumeChange(volume: any) {
        this.audioPlayer.nativeElement.volume = volume.target.value / 100;
    }

    public muteAudio() {
        if (this.isMute) {
            this.audioPlayer.nativeElement.volume = this.volumeBeforeMute;
            this.isMute = false;
        } else {
            this.volumeBeforeMute = this.audioPlayer.nativeElement.volume;
            this.audioPlayer.nativeElement.volume = 0;
            this.isMute = true;
        }
    }

    public isCurrentTrackFavorite(): boolean {
        return this.playerService.isCurrentTrackFavorite();
    }

    public onTrackListChange($event: boolean) {
        this.isTrackListOpen = $event;
    }

    public closeTrackList() {
        if (this.isTrackListOpen) {
            this.location.back();
        }
    }

     async favorite() {
        this.playerService.favoriteTracks.push(this.playerService.getCurrentTrack());
        await firstValueFrom(this.deezerService.addToFavorite(this.playerService.getCurrentTrack().id));
    }

     async unfavorite() {
         this.playerService.favoriteTracks = this.playerService.favoriteTracks.filter(track => track.id != this.playerService.getCurrentTrack().id);
         await firstValueFrom(this.deezerService.removeFromFavorite(this.playerService.getCurrentTrack().id));
     }

    @HostListener('document:keydown.space', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        event.preventDefault()
        if (this.isAudioPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
}
