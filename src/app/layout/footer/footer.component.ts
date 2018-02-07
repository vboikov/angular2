import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Song} from '../../data/song';
import {SongService} from '../../data/song.service';

@Component({
	selector: 'footer-shelf',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
	@ViewChild('trackTime') trackTime: ElementRef;
	@Input() selectedSong: Song;
	song: Song;
	windowWidth: any;
	storage = firebase.storage();
	starsRefAudio: any;
	playStatus: boolean = false;
	audio: HTMLAudioElement;

	constructor(public songService: SongService, public router: Router) {
		this.windowWidth = window.screen.width;
		this.audio = new Audio();
	}


	ngAfterViewInit() {

	}

	takeUrl() {
		let trackTime = this.trackTime.nativeElement;
		this.starsRefAudio = this.storage.ref('uploads/' + this.selectedSong.url);
		if (!this.playStatus) {
			this.starsRefAudio.getDownloadURL().then(data => {
				let track = this.audio;
				this.audio.src = data;
				this.audio.play();
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
			this.audio.currentTime = 0;
			this.audio = new Audio();
		}
		this.playStatus = !this.playStatus;
	}


}
