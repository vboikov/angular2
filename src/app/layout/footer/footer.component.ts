import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild, OnChanges} from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {Song} from '../../data/song';
import {SongService} from '../../data/song.service';

@Component({
	selector: 'footer-shelf',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnChanges {
	@ViewChild('trackTime') trackTime: ElementRef;
	@Input() selectedSong: Song;
	song: Song;
	storage = firebase.storage();
	starsRefAudio: any;
	playStatus: boolean = false;
	audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio();
	}

	ngOnChanges() {
		if  (this.playStatus) {
			this.takeUrl(this.playStatus);
		}
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
				this.audio.src = data;
				this.audio.play();
				this.playStatus = !this.playStatus;
				trackTime.addEventListener('click', function (e) {
					let timeStamp = e.offsetX / trackTime.offsetWidth;
					track.pause();
					track.currentTime = track.duration * timeStamp;
					track.play();
				}, true);
			});
		}
		else {
			this.audio.pause();
			// this.audio.currentTime = 0;
			this.playStatus = !this.playStatus;

			// this.audio = new Audio();
		}
	}


}
