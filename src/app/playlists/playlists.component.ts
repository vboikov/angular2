import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {AuthService} from '../auth/auth.service';
import {FooterComponent} from '../layout/footer/footer.component';
import {PlaylistService} from '../data/playlist.service';
import {Playlist} from '../data/playlist';
import {Router} from '@angular/router';

@Component({
	selector: 'app-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})


export class PlaylistsComponent implements OnInit, OnChanges {
	@Input() data: Song;
	@ViewChild(FooterComponent) footer;
	songs: Song[];
	selectedSong: Song;
	playlists: Playlist[];
	choosePlaylist: Playlist;

	constructor(private songService: SongService, private playlistService: PlaylistService, private router: Router) {
	};

	ngOnInit() {
		this.playlistService.getPlaylists().subscribe(playlists => {
			this.playlists = playlists;
			this.songs = this.playlists[0].songs;
			this.choosePlaylist = playlists[0];
		})

	}

	ngOnChanges() {
		console.log(this.choosePlaylist);
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
}
