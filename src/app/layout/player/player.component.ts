import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Song} from '../../interfaces/song';
import Reference = firebase.storage.Reference;
import {PlaystatusService} from '../../shared/services/playstatus.service';

@Component({
	selector: 'app-player-shelf',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges, OnDestroy, OnInit {
	@Input() selectedSong: Song;
	@Input() songs: Song[];

	private storage = firebase.storage();
	private starsRefAudio: Reference;
	public playStatus = false;
	public audio: HTMLAudioElement;

	constructor(private playstatusService: PlaystatusService) {
		this.audio = new Audio();
	}

	ngOnInit() {
		this.audio.addEventListener('ended', this.changeSong.bind(this, true), true);
	}

	ngOnChanges() {
		this.takeUrl();
		this.playStatus = true;
	}

	ngOnDestroy() {
		this.playStatus = false;
		this.playPause(false);
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
		this.starsRefAudio = this.storage.ref('uploads/' + this.selectedSong.url);
		this.starsRefAudio.getDownloadURL().then(data => {
			track.src = data;
			// TODO service for play state
			track.play();
		}, err => {
			console.log(err);
		});
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
		this.playstatusService.isPlayId = this.selectedSong.id;
		this.takeUrl();
	}
}
