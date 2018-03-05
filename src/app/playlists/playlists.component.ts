import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../shared/services/song.service';
import {PlayerComponent} from '../layout/player/player.component';
import {PlaylistService} from '../shared/services/playlist.service';
import {Playlist} from '../data/playlist';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';

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

	constructor(private db: AngularFireDatabase,
	            private songService: SongService,
	            private playlistService: PlaylistService,
	            private router: Router) {

	};

	ngOnInit() {
		this.db.database.ref('playlists').on('value',
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
	}

	// Visual changes for playlist
	onListChange(event) {
		this.songs = event.songs;
	}

	// Recieve songs for player component
	onSongClick(songs: Song[], i: number): void {
		this.selectedSongs = songs;
		this.selectedSong = this.selectedSongs[i];

	}

	edit(id: number) {
		this.router.navigate(['musicshelf/playlists-edit/' + id]);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
