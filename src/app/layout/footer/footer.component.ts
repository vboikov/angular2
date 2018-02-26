import {Component, ElementRef, Input, AfterViewInit, ViewChild, OnChanges, OnDestroy} from '@angular/core';
import * as firebase from 'firebase/app';
import {Song} from '../../data/song';

@Component({
	selector: 'app-footer-shelf',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnChanges, OnDestroy {
	@ViewChild('trackTime') trackTime: ElementRef;
	@Input() selectedSong: Song;
	@Input() songs: Song[];

	public song: Song;
	private storage = firebase.storage();
	private starsRefAudio: any;
	public playStatus = false;
	public audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio();
	}

	ngOnChanges() {
		if (this.playStatus) {
			this.takeUrl(this.playStatus);
		}
	}
	ngOnDestroy() {
		this.playStatus = false;
		this.takeUrl(this.playStatus);
	}

	ngAfterViewInit() {
		this.takeUrl(!this.playStatus);
	}

	takeUrl(status: boolean) {
		this.playStatus = !status;
		const trackTime = this.trackTime.nativeElement;
		this.starsRefAudio = this.storage.ref('uploads/' + this.selectedSong.url);
		if (!this.playStatus) {
			this.starsRefAudio.getDownloadURL().then(data => {
				const track = this.audio;
				track.pause();
				track.src = data;
				track.play();
				this.playStatus = !this.playStatus;
				trackTime.addEventListener('click', function (e) {
					const timeStamp = e.offsetX / trackTime.offsetWidth;
					track.currentTime = track.duration * timeStamp;
				}, true);
			}, err => {
				console.log(err);
			});
		} else {
			this.audio.pause();
			this.playStatus = !this.playStatus;
		}
	}

	changeSong(state: boolean) {
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
		this.takeUrl(this.playStatus);
	}
}
