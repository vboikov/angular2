import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from './upload';


@Injectable()
export class UploadService {
	private basePath: string = '/uploads';
	private uploadTask: firebase.storage.UploadTask;
	storage = firebase.storage();
	starsRefAudio = this.storage.ref('uploads/carriage.mp3');

	constructor(public http: Http, private af: AngularFireModule, private db: AngularFireDatabase) {
	}

	private saveFileData(upload: Upload) {
		this.db.list(`${this.basePath}/`).push(upload);
	};

	// TODO save upload.url to SONG object
	pushUpload(upload: Upload) {
		let storageRef = this.storage.ref();
		let urlName = upload.file.name;
		let uploadTask = storageRef.child(`${this.basePath}/${urlName}`).put(upload.file);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			function () {
				upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
				upload.url = uploadTask.snapshot.downloadURL;
			},
			(error) => {
				console.log('ERROR', error)
			},
			() => {
				upload.url = uploadTask.snapshot.downloadURL;
				upload.name = upload.file.name;
				this.saveFileData(upload)
			}
		);
	}

	// downloadAudio() {
	// 	this.starsRefAudio.getDownloadURL().then(function (url) {
	// 		let audioURL = url;
	// 		console.log(audioURL);
	// 		return audioURL;
	// 	}).catch(function (error) {
	// 		console.log(error);
	// 	});
	// }


}
