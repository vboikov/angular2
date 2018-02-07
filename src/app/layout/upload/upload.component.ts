import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Upload} from '../../data/upload';
import {UploadService} from '../../data/upload.service';

@Component({
	selector: 'upload-shelf',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css']
})
export class UploadComponent {
	selectedFiles: FileList;
	currentUpload: Upload;

	constructor(public afAuth: AngularFireAuth, public router: Router, private uplService: UploadService) {
	}

	detectFiles(event) {
		this.selectedFiles = event.target.files;
	}

	uploadSingle() {
		let file = this.selectedFiles.item(0);
		this.currentUpload = new Upload(file);
		this.uplService.pushUpload(this.currentUpload)
	}
}
