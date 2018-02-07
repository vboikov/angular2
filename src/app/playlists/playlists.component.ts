import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {AuthService} from '../auth/auth.service';
import {FooterComponent} from '../layout/footer/footer.component';
import {PlaylistService} from '../data/playlist.service';
import {Playlist} from '../data/playlist';

@Component({
	selector: 'app-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})


export class PlaylistsComponent implements OnInit {
	@Input() data: Song;
	@ViewChild(FooterComponent) footer;
	songs: Song[];
	selectedSong: Song;
	playlists: Playlist[];
	choosePlaylist: Playlist;

	constructor(private songService: SongService, private playlistService: PlaylistService) {
	};

	ngOnInit() {
		// this.songService.getSongs().subscribe(songs => {
		// 	this.songs = songs;
		// });
		this.playlistService.getPlaylists().subscribe(playlists => {
			this.playlists = playlists;
			this.songs = this.playlists[1].songs;
		})

	}

	onListChange(event){
		console.log(this.choosePlaylist);
	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
	}
}
