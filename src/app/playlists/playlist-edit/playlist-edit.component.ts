import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Song} from '../../interfaces/song';
import {SongService} from '../../shared/services/song.service';
import {PlaylistService} from '../../shared/services/playlist.service';
import {Playlist} from '../../interfaces/playlist';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {NgControl, NgForm} from '@angular/forms';
import {PlayerComponent} from '../../layout/player/player.component';
import * as _ from 'underscore';
import {Subscription} from 'rxjs/Subscription';
import {PlaystatusService} from '../../shared/services/playstatus.service';

@Component({
	selector: 'app-playlists-edit',
	templateUrl: './playlist-edit.component.html',
	styleUrls: ['./playlist-edit.component.css']
})

export class PlaylistEditComponent implements OnInit, OnDestroy {

	@ViewChild(PlayerComponent) player;
	@ViewChild('editPlaylistForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	private sub: Subscription;
	public playlist: Playlist;
	public songs: Song[];
	public selectedSong: Song;
	public playSongId: number;
	public editFlag: boolean;
	public playlists: Playlist[];

	constructor(private songService: SongService,
	            private playlistService: PlaylistService,
	            private playstatusService: PlaystatusService,
	            private router: Router,
	            private route: ActivatedRoute) {
		route.data.subscribe(data => this.playlist = data['playlist']);
	};

	ngOnInit() {
		this.checkEditFlag();
		this.sub = this.songService.getSongs().subscribe(songs => {
			this.songs = songs;
		});
		this.playstatusService.isPlayId$.subscribe((newId: number) => {
			this.playSongId = newId;
		});
	}

	isChecked(id): boolean {
		return !!_.find(this.playlist.songs, (song) => {
			return song.id === id;
		});
	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
		this.playstatusService.isPlayId = song.id;
	}

	onAddToPlaylist(e, song: Song) {
		if (e.target.checked) {
			this.playlist.songs.push(song);
		} else {
			this.playlist.songs = _.reject(this.playlist.songs, (songSplice) => {
				return songSplice.id === song.id;
			});
		}
	}

	onSubmit(playlist) {
		if (playlist.title && this.playlist.songs.length) {
			this.playlistService.updatePlaylist(playlist);
			this.router.navigate(['musicshelf/playlists']);
		} else {
			alert('Please fill all fields');
		}
	}

	addPlaylist(title) {
		if (title && this.playlist.songs.length) {
			this.playlistService.addPlaylist(title, this.playlist.songs);
			this.router.navigate(['musicshelf/playlists']);
		} else {
			alert('Please fill all fields');
		}
	}

	checkEditFlag() {
		if (this.route.snapshot.url[0].path === 'playlist-add') {
			this.editFlag = false;
		} else {
			this.editFlag = true;
		}
	}


	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
