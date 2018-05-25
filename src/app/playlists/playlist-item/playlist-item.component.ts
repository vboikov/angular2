import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Song} from '../../interfaces/song';

@Component({
	selector: 'app-playlist-item',
	templateUrl: './playlist-item.component.html',
	styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent {
	@Input() data: Song;
	@Output() selectedSong: EventEmitter<Song> = new EventEmitter<Song>();
	public playStatus = false;

	constructor() {}

	public recieveSong(song: Song): void {
		this.selectedSong.emit(song);
		this.playStatus = !this.playStatus;
	}
}
