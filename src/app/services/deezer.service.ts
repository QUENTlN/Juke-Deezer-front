import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Album} from "../models/album.model";
import {firstValueFrom, Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Artist} from "../models/artist.model";
import {Playlist} from "../models/playlist.model";
import {Track} from "../models/track.model";
import {User} from "../models/user.model";
import {Chart} from "../models/chart.model";
import {Podcast} from "../models/podcast.model";
import {Editorial} from "../models/editorial.model";
import {Episode} from "../models/episode.model";
import {Genre} from "../models/genre.model";
import {Radio} from "../models/radio.model";
import {PodcastList} from "../models/podcast-list.model";
import {TrackList} from "../models/track-list.model";
import {EpisodeList} from "../models/episode-list.model";
import {RadioList} from "../models/radio-list.model";
import {AlbumList} from "../models/album-list.model";
import {UserList} from "../models/user-list.model";
import {ArtistList} from "../models/artist-list.model";
import {PlaylistList} from "../models/playlist-list.model";
import {GenreList} from "../models/genre-list.model";
import {Options} from "../models/options.model";

@Injectable({
    providedIn: 'root'
})
export class DeezerService {

    private CORS_URL: string = 'https://cors-anywhere.herokuapp.com/';

    private API_URL: string = 'http://api.deezer.com/';

    private NB_RETRY: number = 1;
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    private httpOptions = {
        headers: this.httpHeaders
    }

    constructor(private http: HttpClient) {
    }

    public static isLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }

    public static getLoggedInUser() {
        let user = localStorage.getItem('loggedInUser');
        if (user) {
            return JSON.parse(user);
        } else {
            return null;
        }
    }

    private static setAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
    }

    private static getAccessToken() {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return JSON.parse(accessToken);
        } else {
            return null;
        }
    }

    private static setLoggedInUser(user: User) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('loggedInUser');
    }

    login(): void {
        window.location.href = 'https://connect.deezer.com/oauth/auth.php?app_id=' + environment.DEEZER_APP_ID + '&redirect_uri=' + environment.DEEZER_REDIRECT_URI + '&perms=' + environment.DEEZER_PERMISSIONS;
    }

    async auth(code: string | null) {
        let params = new HttpParams()
            .set('app_id', environment.DEEZER_APP_ID)
            .set('secret', environment.DEEZER_APP_SECRET)
            .set('code', code ? code : '')
            .set('output', 'json');

        const HttpOptions = {
            headers: this.httpHeaders,
            params,
        };

        DeezerService.setAccessToken((await firstValueFrom(this.http.get<any>(this.CORS_URL + 'https://connect.deezer.com/oauth/access_token.php', HttpOptions) // ?app_id=' + environment.DEEZER_APP_ID + '&secret=' + environment.DEEZER_APP_SECRET + '&code=' + (code ? code : '') + '&output=json'
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            ))).access_token);

        DeezerService.setLoggedInUser(await firstValueFrom(this.getMe()));
    }

    getAlbum(id: number): Observable<Album> {
        return this.http.get<Album>(this.getBaseUrl() + 'album/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getTracksOfAlbum(id: number): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'album/' + id + '/tracks', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    addAlbumToFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'album_id',
                value: id
            }
        ]);
        return this.http.post<boolean>(this.getBaseUrl() + 'user/me/albums', null, httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Album endpoints

    removeAlbumFromFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'album_id',
                value: id
            }
        ]);
        return this.http.delete<boolean>(this.getBaseUrl() + 'user/me/albums', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getArtist(id: number): Observable<Artist> {
        return this.http.get<Artist>(this.getBaseUrl() + 'artist/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getArtistAlbums(id: number): Observable<AlbumList> {
        return this.http.get<AlbumList>(this.getBaseUrl() + 'artist/' + id + '/albums', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getRelatedArtists(id: number): Observable<ArtistList> {
        return this.http.get<ArtistList>(this.getBaseUrl() + 'artist/' + id + '/related', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Artist endpoints

    getArtistRadio(id: number): Observable<Track[]> {
        return this.http.get<Track[]>(this.getBaseUrl() + 'artist/' + id + '/radio', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getArtistPlaylists(id: number): Observable<PlaylistList> {
        return this.http.get<PlaylistList>(this.getBaseUrl() + 'artist/' + id + '/playlists', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    addArtistToFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'artist_id',
                value: id
            }
        ]);
        return this.http.post<boolean>(this.getBaseUrl() + 'user/me/artists', null, httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    removeArtistFromFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'artist_id',
                value: id
            }
        ]);
        return this.http.delete<boolean>(this.getBaseUrl() + 'user/me/artists', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getChart(): Observable<Chart> {
        return this.http.get<Chart>(this.getBaseUrl() + 'chart', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getTracksChart(): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'chart/tracks', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getAlbumsChart(): Observable<Album[]> {
        return this.http.get<Album[]>(this.getBaseUrl() + 'chart/albums', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Chart endpoints

    getArtistsChart(): Observable<ArtistList> {
        return this.http.get<ArtistList>(this.getBaseUrl() + 'chart/artists', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPlaylistsChart(): Observable<Playlist[]> {
        return this.http.get<Playlist[]>(this.getBaseUrl() + 'chart/playlists', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPodCastsChart(): Observable<Podcast[]> {
        return this.http.get<Podcast[]>(this.getBaseUrl() + 'chart/podcasts', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getEditorials(): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(this.getBaseUrl() + 'editorial', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getEditorial(id: number): Observable<Editorial> {
        return this.http.get<Editorial>(this.getBaseUrl() + 'editorial/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getEditorialSelections(id: number): Observable<Editorial[]> {
        return this.http.get<Editorial[]>(this.getBaseUrl() + 'editorial/' + id + '/selection', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Editorial endpoints

    getEditorialChart(id: number): Observable<Chart> {
        return this.http.get<Chart>(this.getBaseUrl() + 'editorial/' + id + '/chart', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getEditorialReleases(id: number): Observable<Album> {
        return this.http.get<Album>(this.getBaseUrl() + 'editorial/' + id + '/releases', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getEpisode(id: number): Observable<Episode> {
        return this.http.get<Episode>(this.getBaseUrl() + 'episode/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getGenre(id: number): Observable<Genre> {
        return this.http.get<Genre>(this.getBaseUrl() + 'genre/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getGenres(): Observable<GenreList> {
        return this.http.get<GenreList>(this.getBaseUrl() + 'genre', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Episode endpoints

    getArtistsByGenre(id: number): Observable<ArtistList> {
        return this.http.get<ArtistList>(this.getBaseUrl() + 'genre/' + id + '/artists', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // TODO: post episode bookmark
    // TODO: delete episode bookmark

    // Genre endpoints

    getPodcastsByGenre(id: number): Observable<PodcastList> {
        return this.http.get<PodcastList>(this.getBaseUrl() + 'genre/' + id + '/podcasts', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPlaylist(id: number): Observable<Playlist> {
        return this.http.get<Playlist>(this.getBaseUrl() + 'playlist/' + id, this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPlaylistTracks(id: number): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'playlist/' + id + '/tracks', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPodcast(id: number): Observable<Podcast> {
        return this.http.get<Podcast>(this.getBaseUrl() + 'podcast/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Playlist endpoints

    getPodcasts(): Observable<PodcastList> {
        return this.http.get<PodcastList>(this.getBaseUrl() + 'podcast/', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getPodcastEpisodes(id: number): Observable<EpisodeList> {
        return this.http.get<EpisodeList>(this.getBaseUrl() + 'podcast/' + id + '/episodes', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Podcast endpoints

    getRadios(): Observable<RadioList> {
        return this.http.get<RadioList>(this.getBaseUrl() + 'radio/', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getRadio(id: number): Observable<Radio> {
        return this.http.get<Radio>(this.getBaseUrl() + 'radio/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getRadiosByGenre(id: number): Observable<RadioList> {
        return this.http.get<RadioList>(this.getBaseUrl() + 'genre/' + id + '/radios', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Radio endpoints

    getTopRadio(): Observable<RadioList> {
        return this.http.get<RadioList>(this.getBaseUrl() + 'radio/top', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getTopTrackArtist(id: number): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'artist/' + id + '/top', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getRadioTracks(id: number): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'radio/' + id + '/tracks', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchTracks(query: string): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'search/track?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchAlbums(query: string): Observable<AlbumList> {
        return this.http.get<AlbumList>(this.getBaseUrl() + 'search/album?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchArtists(query: string): Observable<ArtistList> {
        return this.http.get<ArtistList>(this.getBaseUrl() + 'search/artist?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // TODO: get personal radio list (error 500)

    // Search endpoints

    searchPlaylists(query: string): Observable<PlaylistList> {
        return this.http.get<PlaylistList>(this.getBaseUrl() + 'search/playlist?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchPodcasts(query: string): Observable<PodcastList> {
        return this.http.get<PodcastList>(this.getBaseUrl() + 'search/podcast?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchRadios(query: string): Observable<RadioList> {
        return this.http.get<RadioList>(this.getBaseUrl() + 'search/radio?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    searchUsers(query: string): Observable<UserList> {
        return this.http.get<UserList>(this.getBaseUrl() + 'search/user?q=' + query, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getHistory(): Observable<History> {
        return this.http.get<History>(this.getBaseUrl() + 'history', this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getTrack(id: number): Observable<Track> {
        return this.http.get<Track>(this.getBaseUrl() + 'track/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    addToFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'track_id',
                value: id
            }
        ]);
        return this.http.post<any>(this.getBaseUrl() + 'user/me/tracks', null, httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    removeFromFavorite(id: number): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'track_id',
                value: id
            }
        ]);
        return this.http.delete<any>(this.getBaseUrl() + 'user/me/tracks', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // Track endpoints

    getMe(): Observable<User> {
        let params = new HttpParams()
            .set('access_token', DeezerService.getAccessToken() ?? '');

        const httpOptions = {
            headers: this.httpHeaders,
            params,
        };

        return this.http.get<User>(this.getBaseUrl() + 'user/me', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(this.getBaseUrl() + 'user/' + id, this.httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getArtistByUser(): Observable<ArtistList> {

        let params = new HttpParams()
            .set('access_token', DeezerService.getAccessToken() ?? '');

        const httpOptions = {
            headers: this.httpHeaders,
            params,
        };
        return this.http.get<ArtistList>(this.getBaseUrl() + 'user/me/artists', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    // User endpoints

    getPlaylistsByUser(): Observable<PlaylistList> {
        return this.http.get<PlaylistList>(this.getBaseUrl() + 'user/me/playlists', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getAlbumByUser(): Observable<AlbumList> {
        return this.http.get<AlbumList>(this.getBaseUrl() + 'user/me/albums', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getChartByUser(): Observable<TrackList> {

        let params = new HttpParams()
            .set('access_token', DeezerService.getAccessToken() ?? '');

        const httpOptions = {
            headers: this.httpHeaders,
            params,
        };
        return this.http.get<TrackList>(this.getBaseUrl() + 'user/me/charts/tracks', httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getFavoriteTracks(): Observable<TrackList> {
        return this.http.get<TrackList>(this.getBaseUrl() + 'user/me/tracks', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getFavoriteAlbums(): Observable<AlbumList> {
        return this.http.get<AlbumList>(this.getBaseUrl() + 'user/me/albums', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getFavoriteArtists(): Observable<ArtistList> {
        return this.http.get<ArtistList>(this.getBaseUrl() + 'user/me/artists', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    addTracksToPlaylist(id: number, tracksToAdd: number[]): Observable<boolean> {
        const httpOptions = this.customHttpOptions([
            {
                name: 'songs',
                value: tracksToAdd.join(',')
            }
        ]);
        return this.http.post<boolean>(this.getBaseUrl() + 'playlist/' + id + '/tracks', null, httpOptions)
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    getOptions(): Observable<Options> {
        return this.http.get<Options>(this.getBaseUrl() + 'options', this.getHttpOptions())
            .pipe(
                retry(this.NB_RETRY),
                catchError(this.handleError)
            );
    }

    handleError(error: any) {
        let errorMessage;
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => error);
    }

    private getHttpOptions() {
        let params = new HttpParams()
            .set('limit', 20000)
            .set('access_token', DeezerService.getAccessToken() ?? '');

        return {
            headers: this.httpHeaders,
            params: params
        }
    }

    private customHttpOptions(addParams: { name: string, value: any }[]) {
        let params = new HttpParams()
            .set('limit', 20000)
            .set('access_token', DeezerService.getAccessToken() ?? '');
        addParams.forEach(param => params = params.set(param.name, param.value));

        return {
            headers: this.httpHeaders,
            params: params
        }
    }

    private getBaseUrl(): string {
        return this.CORS_URL + this.API_URL;
    }
}
