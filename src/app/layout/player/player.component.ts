import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../../interfaces/song';
import {PlaystatusService} from '../../shared/services/playstatus.service';
import {SpinnerService} from '../../shared/spinner/spinner.service';

@Component({
	selector: 'app-player-shelf',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges, OnDestroy, OnInit {
	@Input() selectedSong: Song;
	@Input() songs: Song[];

	private URL = 'https://docs.google.com/uc?authuser=0&id=';
	public playStatus = false;
	public audio: HTMLAudioElement;

	constructor(private playstatusService: PlaystatusService, private spinnerService: SpinnerService) {
		this.audio = new Audio();
	}

	ngOnInit() {
		this.audio.addEventListener('ended', this.changeSong.bind(this, true), true);
		this.audio.addEventListener('playing', this.spinnerInit.bind(this), true);
	}

	ngOnChanges() {
		this.takeUrl();
		this.playStatus = true;
	}

	ngOnDestroy() {
		this.playStatus = false;
		this.playPause(false);
	}

	public spinnerInit() {
		this.spinnerService.hide();
	}

	public playPause(state: boolean) {
		if (!state) {
			this.audio.pause();
		} else {
			this.audio.play();
		}
		this.playStatus = !this.playStatus;

	}

	public takeUrl() {
		const track = this.audio;
		track.src = this.URL  + this.selectedSong.url + '&type=.mp3';
		this.spinnerService.show();
		track.play();
	}

	public changeSong(state: boolean) {
		let step;
		const amount = this.songs.length - 1;
		const indexOfSong = this.songs.indexOf(this.selectedSong);
		if (state) {
			step = indexOfSong + 1;
			if (indexOfSong === amount) {
				this.selectedSong = this.songs[0];
			}
			if (indexOfSong !== amount) {
				this.selectedSong = this.songs[step];
			}
		} else {
			step = indexOfSong - 1;
			if (indexOfSong === 0) {
				this.selectedSong = this.songs[amount];
			}
			if (indexOfSong !== 0) {
				this.selectedSong = this.songs[step];
			}
		}
		this.playstatusService.isPlayId = this.selectedSong.url;
		this.takeUrl();
	}
}
