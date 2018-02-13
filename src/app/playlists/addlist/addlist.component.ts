import {Component, OnInit, Input, ViewChild, EventEmitter} from '@angular/core';
import {FormsModule, NgForm, NgControl} from '@angular/forms'
import {Router} from '@angular/router';
import {SongService} from '../../data/song.service';
import {Song} from '../../data/song';
import {FooterComponent} from '../../layout/footer/footer.component';
import {Playlist} from '../../data/playlist';
import {PlaylistService} from '../../data/playlist.service';


@Component({
	selector: 'app-add-playlist',
	templateUrl: './addlist.component.html',
	styleUrls: ['./addlist.component.css']
})


export class AddListComponent implements OnInit {
	@ViewChild(FooterComponent) footer;
	@ViewChild('addPlaylistForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	formValue: any;
	nameValue: string;
	playlists: Playlist[];
	playlist: Playlist;
	songs: Song[];
	playlistSongs: Song[] = [];
	selectedSong: Song;
	playStatus: boolean = false;
	constructor(private router: Router, private songService: SongService, private playlistService: PlaylistService) {
	};


	ngOnInit() {
		this.songService.getSongs().subscribe(songs => {
			this.songs = songs;
		});

		this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;

		});

		this.nameControlDir.control.valueChanges.subscribe(value => {
			this.nameValue = value;
		});

	}

	onAddToPlaylist(e, song: Song) {
		if (e.target.checked){
			this.playlistSongs.push(song);
		}
		else {
			this.playlistSongs.forEach( (item, index) => {
				if(item === song) {
					this.playlistSongs.splice(index,1);
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
			this.router.navigate(['playlists']);
		}
		else {
			alert('Please fill all fields');
		}
	}

}
