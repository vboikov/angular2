import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SongService} from '../../shared/services/song.service';
import {Song} from '../../data/song';
import {Playlist} from '../../data/playlist';
import {PlaylistService} from '../../shared/services/playlist.service';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
	selector: 'app-add-playlist',
	templateUrl: './playlist-add.component.html',
	styleUrls: ['./playlist-add.component.css']
})

export class PlaylistAddComponent implements OnInit, OnDestroy {
	@ViewChild('addPlaylistForm') formControlDir: NgForm;
	private sub: Subscription;
	private formValue: any;
	public playlists: Playlist[];
	public playlist: Playlist;
	public songs: Song[];
	public playlistSongs: Song[] = [];
	public selectedSong: Song;
	public playStatus = false;

	constructor(private db: AngularFireDatabase,
	            private router: Router,
	            private songService: SongService,
	            private playlistService: PlaylistService) {
	};

	ngOnInit() {
		this.db.database.ref('songs').on('value',
			(data) => {
				if (data.val() === null) {
					this.router.navigate(['musicshelf/addsong']);
				}
			}, (err) => {
				console.log('Error', err.val());
			});
		this.sub = this.songService.getSongs().subscribe(songs => {
			if (songs.length > 0) {
				this.songs = songs;
			}
		});
		this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;

		});
	}

	onAddToPlaylist(e, song: Song) {
		if (e.target.checked) {
			this.playlistSongs.push(song);
		} else {
			this.playlistSongs.forEach((item, index) => {
				if (item === song) {
					this.playlistSongs.splice(index, 1);
				}
			});
		}
	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
		this.playStatus = !this.playStatus;
	}

	onSubmit(title) {
		if (title && this.playlistSongs.length) {
			this.playlistService.addPlaylist(title, this.playlistSongs);
			this.router.navigate(['musicshelf/playlists']);
		} else {
			alert('Please fill all fields');
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
