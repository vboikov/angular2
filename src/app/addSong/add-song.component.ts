import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {NgForm, NgControl} from '@angular/forms'
import {Router} from '@angular/router';
import {Upload} from '../data/upload';
import {UploadService} from '../data/upload.service';


@Component({
	selector: 'app-add',
	templateUrl: './add-song.component.html',
	styleUrls: ['./add-song.component.css']
})


export class AddSongComponent implements OnInit {
	@Input() data: Song[];
	@ViewChild('addSongForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	song: Song;
	formValue: any;
	nameValue: string;
	selectedFile: File;
	currentUpload: Upload;

	constructor(private router: Router,
	            private songService: SongService,
	            private uplService: UploadService) {
	};


	ngOnInit() {
		this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;
		});
		this.nameControlDir.control.valueChanges.subscribe(value => {
			this.nameValue = value;
		});
	}

	onSubmit(obj) {
		if (this.validate(obj)) {
			this.songService.addSong(obj);
			this.uploadSingle();
		}
		else {
			alert('Please fill all fields');
		}
	}

	validate(obj) {
		if (obj.title && obj.singer && obj.album && obj.infoSong) {
			return true;
		}
	}

	detectFiles(event) {
		if(event.target.files[0].type === "audio/mp3"){
			this.selectedFile = event.target.files[0];
		}
		else{
			alert('Only .mp3');
		}
	}

	uploadSingle() {
		this.currentUpload = new Upload(this.selectedFile);
		this.uplService.pushUpload(this.currentUpload);
	}
}
