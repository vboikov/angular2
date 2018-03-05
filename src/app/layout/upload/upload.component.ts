import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Upload} from '../../data/upload';
import {UploadService} from '../../shared/services/upload.service';

@Component({
	selector: 'app-upload-shelf',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent {
	public selectedFiles: FileList;
	public currentUpload: Upload;

	constructor(public router: Router, private uplService: UploadService) {
	}

	detectFiles(event) {
		this.selectedFiles = event.target.files;
	}

	uploadSingle() {
		const file = this.selectedFiles.item(0);
		this.currentUpload = new Upload(file);
		this.uplService.pushUpload(this.currentUpload);
	}
}
