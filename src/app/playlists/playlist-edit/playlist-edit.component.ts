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
	public playSongUrl: string;
	public editFlag = false;
	public playlists: Playlist[];

	constructor(private songService: SongService,
	            private playlistService: PlaylistService,
	            private playstatusService: PlaystatusService,
	            private router: Router,
	            private route: ActivatedRoute) {
		route.data.subscribe((data) => this.playlist = data['playlist']);
	};

	ngOnInit() {
		this.checkEditFlag();
		this.sub = this.songService.getSongs().subscribe(songs => {
			this.songs = songs;
		});
		this.playstatusService.isPlayId$.subscribe((newId: string) => {
			this.playSongUrl = newId;
		});
	}

	public isChecked(song): boolean {
		return !!_.find(this.playlist.songs, (item) => {
			return item.url === song.url;
		});
	}

	public onSongClick(song: Song): void {
		this.selectedSong = song;
		this.playstatusService.isPlayId = song.url;
	}

	public onAddToPlaylist(e, song: Song): void {
		if (e.target.checked) {
			this.playlist.songs.push(song);
		} else {
			this.playlist.songs = _.reject(this.playlist.songs, (songSplice) => {
				return songSplice.url === song.url;
			});
		}
	}

	public updatePlaylist(playlist): void {
		if (playlist.title && this.playlist.songs.length) {
			this.playlistService.updatePlaylist(playlist);
			this.router.navigate(['musicshelf/playlists']);
		} else {
			alert('Please fill all fields');
		}
	}

	public addPlaylist(title): void {
		if (title && this.playlist.songs.length) {
			this.playlistService.addPlaylist(this.playlist);
			this.router.navigate(['musicshelf/playlists']);
		} else {
			alert('Please fill all fields');
		}
	}

	public checkEditFlag(): void {
		if (this.route.snapshot.url[0].path !== 'playlist-add') {
			this.editFlag = true;
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
