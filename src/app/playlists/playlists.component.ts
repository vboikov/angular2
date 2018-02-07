import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {AuthService} from '../auth/auth.service';
import {FooterComponent} from '../layout/footer/footer.component';

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

	constructor(private songService: SongService) {
	};

	ngOnInit() {
		this.songService.getSongs().subscribe(songs => {
			this.songs = songs;
		});

	}

	onSongClick(song: Song): void {
		this.selectedSong = song;
	}
}
