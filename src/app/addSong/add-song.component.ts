import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {Song} from '../interfaces/song';
import {SongService} from '../shared/services/song.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Upload} from '../interfaces/upload';
import {UploadService} from '../shared/services/upload.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
	selector: 'app-add',
	templateUrl: './add-song.component.html',
	styleUrls: ['./add-song.component.css']
})


export class AddSongComponent implements OnInit, OnDestroy {
	@ViewChild('addSongForm') formControlDir: NgForm;

	private sub: Subscription;
	public formValue: any;
	public selectedFile: File;
	public currentUpload: Upload;
	public fileId: any;

	constructor(private router: Router,
	            private songService: SongService,
	            private uplService: UploadService) {
	};

	ngOnInit() {
		this.sub = this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;
		});
	}

	public onSubmit(obj): void {
		if (obj.title && obj.singer && obj.album && obj.infoSong) {
			this.uplService.upload(this.selectedFile).then((res) => {
				this.fileId = res;
				this.songService.addSong(obj, res).then(() => {
					this.router.navigate(['musicshelf/playlists']);
				});
			});
		} else {
			alert('Please fill all fields');
		}
	}

	public detectFiles(event): void {
		if (event.target.files[0].type === 'audio/mp3') {
			this.selectedFile = event.target.files[0];
		} else {
			alert('Only .mp3');
		}
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
