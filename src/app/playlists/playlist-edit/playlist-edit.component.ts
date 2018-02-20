import {Component, OnInit, ViewChild} from '@angular/core';
import {Song} from '../../data/song';
import {SongService} from '../../data/song.service';
import {PlaylistService} from '../../data/playlist.service';
import {Playlist} from '../../data/playlist';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {NgControl, NgForm} from '@angular/forms';
import {FooterComponent} from '../../layout/footer/footer.component';
import * as _ from 'underscore';

@Component({
	selector: 'app-playlists-edit',
	templateUrl: './playlist-edit.component.html',
	styleUrls: ['./playlist-edit.component.css']
})

export class PlaylistEditComponent implements OnInit {

	@ViewChild(FooterComponent) footer;
	@ViewChild('editPlaylistForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	formValue: any;
	nameValue: string;
	playlist: Playlist;
	songs: Song[];
	selectedSong: Song;
	playStatus: boolean = false;
	playlists: Playlist[];

	constructor(private songService: SongService, private playlistService: PlaylistService, private router: Router, private route: ActivatedRoute,) {
		route.data.subscribe(data => this.playlist = data['playlist'])
	};

	ngOnInit() {
		this.songService.getSongs().subscribe(songs => {
			this.songs = songs;
		});
	}

	isChecked(id): boolean {
		return !!_.find(this.playlist.songs, (song) => {
			return song.id === id;
		});
	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
		this.playStatus = !this.playStatus;
	}

	onAddToPlaylist(e, song: Song) {
		if (e.target.checked) {
			this.playlist.songs.push(song);
		}
		else {
			this.playlist.songs = _.reject(this.playlist.songs, (songSplice) => {
				return songSplice.id === song.id;
			});
		}
	}

	onSubmit(playlist) {
		if (playlist.title && this.playlist.songs.length) {
			this.playlistService.updatePlaylist(playlist);
			this.router.navigate(['musicshelf/playlists']);
		}
		else {
			alert('Please fill all fields');
		}
	}
}
