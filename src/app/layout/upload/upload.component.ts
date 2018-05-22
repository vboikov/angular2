import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-upload-shelf',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent {
	public selectedFiles: FileList;

	constructor(public router: Router) {
	}

	public detectFiles(event) {
		this.selectedFiles = event.target.files;
	}
}
