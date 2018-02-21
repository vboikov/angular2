import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {NgForm, NgControl} from '@angular/forms'
import {Router} from '@angular/router';
import {SongService} from '../../data/song.service';
import {Song} from '../../data/song';
import {FooterComponent} from '../../layout/footer/footer.component';
import {Playlist} from '../../data/playlist';
import {PlaylistService} from '../../data/playlist.service';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
	selector: 'app-add-playlist',
	templateUrl: './addlist.component.html',
	styleUrls: ['./addlist.component.css']
})


export class AddListComponent implements OnInit, OnDestroy {
	@ViewChild(FooterComponent) footer;
	@ViewChild('addPlaylistForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	sub: Subscription;
	formValue: any;
	nameValue: string;
	playlists: Playlist[];
	playlist: Playlist;
	songs: Song[];
	playlistSongs: Song[] = [];
	selectedSong: Song;
	playStatus: boolean = false;

	constructor(private db: AngularFireDatabase ,private router: Router, private songService: SongService, private playlistService: PlaylistService) {

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
			if(songs.length > 0) {
				this.songs = songs;
			}
		});
		this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;

		});
		this.nameControlDir.control.valueChanges.subscribe(value => {
			this.nameValue = value;
		});
	}

	onAddToPlaylist(e, song: Song) {
		if (e.target.checked) {
			this.playlistSongs.push(song);
		}
		else {
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
		}
		else {
			alert('Please fill all fields');
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
