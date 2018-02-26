import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Song} from '../../data/song';
import {Router, ActivatedRoute} from '@angular/router';
import {SongService} from '../../data/song.service';

@Component({
	selector: 'app-playlist-item',
	templateUrl: './playlist-item.component.html',
	styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent {
	@Input() data: Song[];
	@Output() selectedSong: EventEmitter<Song> = new EventEmitter<Song>();
	public playStatus = false;

	constructor(private router: Router,
	            private route: ActivatedRoute,
	            private songService: SongService) {
	}

	recieveSong(song: Song): void {
		this.selectedSong.emit(song);
		this.playStatus = !this.playStatus;
	}

	deleteSong(i) {
		this.songService.deleteSong(i);
	}

}
