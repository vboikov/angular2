import {Component, OnInit, OnDestroy, Input, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../data/song.service';
import {SongResolver} from '../../data/song.resolver';
import {Howl} from 'howler';

import {Song} from '../../data/song';

@Component({
	moduleId: module.id,
	selector: 'app-tabs-content',
	templateUrl: './tabs-content.component.html',
	styleUrls: ['./tabs-content.component.css']
})
export class TabsContentComponent implements OnInit, OnDestroy {
	private id: number;
	private res;
	public song: Song;
	audio: HTMLAudioElement;
	stateAudio: boolean = false;

	constructor(private route: ActivatedRoute,
	            private songService: SongService,
	            private songResolver: SongResolver) {
	}

	// TODO write service for recieve SRC of audio and component for player
	playAudio() {
		this.stateAudio = !this.stateAudio;
		if (this.stateAudio) {
			this.audio.load();
			this.audio.play();
		}
		else {
			this.audio.pause();
		}
	}

	ngOnInit() {
		this.res = this.route.params.subscribe(data => {
			this.songService.getSongById(data['id']).subscribe(res => {
				this.song = res[data['id']];
			})
		});
		this.audio = new Audio();
	}

	ngOnDestroy() {
		this.res.unsubscribe();
	}
}
