import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {Song} from '../../interfaces/song';
import {Router, ActivatedRoute} from '@angular/router';
import {SongService} from '../../shared/services/song.service';
import {PlaystatusService} from '../../shared/services/playstatus.service';

@Component({
	selector: 'app-playlist-item',
	templateUrl: './playlist-item.component.html',
	styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnInit, OnChanges {
	@Input() data: Song;
	@Output() selectedSong: EventEmitter<Song> = new EventEmitter<Song>();
	public playStatus = false;
	public playSong: number;

	constructor(private router: Router,
	            private route: ActivatedRoute,
	            private songService: SongService,
	            private playstatusService: PlaystatusService) {
	}

	ngOnInit() {
	}

	ngOnChanges() {

	}

	public recieveSong(song: Song): void {
		this.selectedSong.emit(song);
		this.playStatus = !this.playStatus;
	}

	deleteSong(i) {
		this.songService.deleteSong(i);
	}

}
