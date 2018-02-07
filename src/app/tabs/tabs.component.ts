import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {AuthService} from '../auth/auth.service';
import {FooterComponent} from '../layout/footer/footer.component';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.html',
	styleUrls: ['./tabs.css']
})


export class TabsComponent implements OnInit {
	@Input() data: Song;
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
