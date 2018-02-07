import {Component, OnInit, Input, ViewChild, EventEmitter} from '@angular/core';
import {Song} from '../data/song';
import {SongService} from '../data/song.service';
import {FormsModule, NgForm, NgControl} from '@angular/forms'
import {Router} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
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
	selectedFiles: FileList;
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
		this.selectedFiles = event.target.files;
	}

	uploadSingle() {
		let file = this.selectedFiles.item(0);
		this.currentUpload = new Upload(file);
		this.uplService.pushUpload(this.currentUpload);
	}
}
