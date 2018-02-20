import {Component, ElementRef, Input, AfterViewInit, ViewChild, OnChanges, OnDestroy} from '@angular/core';
import * as firebase from 'firebase/app';
import {Song} from '../../data/song';

@Component({
	selector: 'footer-shelf',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnChanges, OnDestroy {
	@ViewChild('trackTime') trackTime: ElementRef;
	@Input() selectedSong: Song;
	@Input() songs: Song[];

	song: Song;
	storage = firebase.storage();
	starsRefAudio: any;
	playStatus: boolean = false;
	audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio();
	}

	ngOnChanges() {
		if (this.playStatus) {
			this.takeUrl(this.playStatus);
		}
	}
	ngOnDestroy(){
		this.playStatus = false;
		this.takeUrl(this.playStatus);
	}

	ngAfterViewInit() {
		this.takeUrl(!this.playStatus);
	}

	takeUrl(status: boolean) {
		this.playStatus = !status;
		let trackTime = this.trackTime.nativeElement;
		this.starsRefAudio = this.storage.ref('uploads/' + this.selectedSong.url);
		if (!this.playStatus) {
			this.starsRefAudio.getDownloadURL().then(data => {
				let track = this.audio;
				track.pause();
				track.src = data;
				track.play();
				this.playStatus = !this.playStatus;
				trackTime.addEventListener('click', function (e) {
					let timeStamp = e.offsetX / trackTime.offsetWidth;
					track.currentTime = track.duration * timeStamp;
				}, true);
			}, err => {
				console.log(err);
			});
		}
		else {
			this.audio.pause();
			this.playStatus = !this.playStatus;
		}
	}

	changeSong(state: boolean) {
		let amount = this.songs.length - 1;
		let indexOfSong = this.songs.indexOf(this.selectedSong);
		if (state) {
			let step = indexOfSong + 1;
			if (indexOfSong === amount) {
				this.selectedSong = this.songs[0];
			}
			if (indexOfSong !== amount) {
				this.selectedSong = this.songs[step];
			}
		}
		if (!state) {
			let step = indexOfSong - 1;
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
