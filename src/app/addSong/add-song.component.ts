import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../shared/services/song.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Upload} from '../data/upload';
import {UploadService} from '../shared/services/upload.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
	selector: 'app-add',
	templateUrl: './add-song.component.html',
	styleUrls: ['./add-song.component.css']
})


export class AddSongComponent implements OnInit, OnDestroy {
	@Input() data: Song[];
	@ViewChild('addSongForm') formControlDir: NgForm;

	private sub: Subscription;
	public formValue: any;
	public selectedFile: File;
	public currentUpload: Upload;

	constructor(private router: Router,
	            private songService: SongService,
	            private uplService: UploadService) {
	};

	ngOnInit() {
		this.sub = this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;
		});
	}

	onSubmit(obj) {
		if (obj.title && obj.singer && obj.album && obj.infoSong) {
			this.songService.addSong(obj);
			this.uploadSingle();
		} else {
			alert('Please fill all fields');
		}
	}

	detectFiles(event) {
		if (event.target.files[0].type === 'audio/mp3') {
			this.selectedFile = event.target.files[0];
		} else {
			alert('Only .mp3');
		}
	}

	uploadSingle() {
		this.currentUpload = new Upload(this.selectedFile);
		this.uplService.pushUpload(this.currentUpload);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
