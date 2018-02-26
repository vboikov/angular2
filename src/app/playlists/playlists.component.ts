import {Component, Input, OnInit, OnDestroy, ViewChild, OnChanges} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {FooterComponent} from '../layout/footer/footer.component';
import {PlaylistService} from '../data/playlist.service';
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
	@ViewChild(FooterComponent) footer;
	private sub: Subscription;
	public songs: Song[];
	public selectedSong: Song;
	public playlists: Playlist[];
	public choosePlaylist: Playlist;

	constructor(private db: AngularFireDatabase,
	            private songService: SongService,
	            private playlistService: PlaylistService,
	            private router: Router) {

	};

	ngOnInit() {
		this.db.database.ref('playlists').on('value',
			(data) => {
				if (data.val() === null) {
					this.router.navigate(['musicshelf/addlist/']);
				}
			}, (err) => {
				console.log('Error', err.val());
			});
		this.sub = this.playlistService.getPlaylists().subscribe(playlists => {
			if (playlists.length > 0) {
				this.choosePlaylist = playlists[0];
				this.songs = playlists[0].songs;
				this.playlists = playlists;
			}
		});
	}

	onListChange(event) {
		this.songs = event.songs;
		this.selectedSong = this.songs[0];

	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
	}

	edit(id: number) {
		this.router.navigate(['musicshelf/playlists-edit/' + id]);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
