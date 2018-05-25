import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Song} from '../interfaces/song';
import {SongService} from '../shared/services/song.service';
import {PlayerComponent} from '../layout/player/player.component';
import {PlaylistService} from '../shared/services/playlist.service';
import {Playlist} from '../interfaces/playlist';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';
import {PlaystatusService} from '../shared/services/playstatus.service';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';

@Component({
	selector: 'app-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})


export class PlaylistsComponent implements OnInit, OnDestroy {
	@Input() data: Song;
	@ViewChild(PlayerComponent) footer;
	private sub: Subscription;
	public songs: Song[];
	public selectedSong: Song;
	public playlists: Playlist[];
	public choosePlaylist: Playlist;
	public selectedSongs: Song[];
	public playSongId: string;
	public playSong$: Observable<string>;
	private userToken: string;
	constructor(private db: AngularFireDatabase,
	            private songService: SongService,
	            private playlistService: PlaylistService,
	            private authService: AuthService,
	            private playstatusService: PlaystatusService,
	            private router: Router) {

	};

	ngOnInit() {
		this.userToken = this.authService.auth2UserToken();
		this.db.database.ref('users/' + this.userToken + '/playlists').on('value',
			(data) => {
				if (data.val() === null) {
					this.router.navigate(['musicshelf/playlist-add/']);
				}
			}, (err) => {
				console.log('Error', err.val());
			});
		this.sub = this.playlistService.getPlaylists().subscribe(playlists => {
			if (playlists.length > 0) {
				this.playlists = playlists;
				this.choosePlaylist = this.playlists[0];
				this.songs = this.choosePlaylist.songs;
			}
		});
		this.playstatusService.isPlayId$.subscribe((newId: string) => {
			this.playSongId = newId;
		});
	}


	// Visual changes for playlist
	public onListChange(event): void {
		this.songs = event.songs;
	}

	// Recieve songs for player component
	public onSongClick(songs: Song[], i: number): void {
		this.selectedSongs = songs;
		this.selectedSong = this.selectedSongs[i];
		this.playstatusService.isPlayId = this.selectedSongs[i].url;
	}

	public edit(id: number): void {
		this.router.navigate(['musicshelf/playlists-edit/' + id]);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
