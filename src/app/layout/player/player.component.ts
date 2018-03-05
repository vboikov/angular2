import {Component, ElementRef, Input, AfterViewInit, ViewChild, OnChanges, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {Song} from '../../data/song';

@Component({
	selector: 'app-player-shelf',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges, OnDestroy, OnInit {
	@ViewChild('trackTime') trackTime: ElementRef;
	@Input() selectedSong: Song;
	@Input() songs: Song[];

	private storage = firebase.storage();
	private starsRefAudio: any;
	public playStatus = false;
	public audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio();
	}

	ngOnInit() {
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
		// TODO divide to few funсtions
		const track = this.audio;
		const trackTime = this.trackTime.nativeElement;
		this.starsRefAudio = this.storage.ref('uploads/' + this.selectedSong.url);
		this.starsRefAudio.getDownloadURL().then(data => {
			track.src = data;
			track.play();
			// Search timeline
			trackTime.addEventListener('click', function (e) {
				const timeStamp = e.offsetX / trackTime.offsetWidth;
				track.currentTime = track.duration * timeStamp;
			}, true);
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
		this.takeUrl();
	}
}
