import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from '../../data/upload';


@Injectable()
export class UploadService {
	private basePath = '/uploads';
	private storage = firebase.storage();

	constructor(private af: AngularFireModule, private db: AngularFireDatabase) {
	}

	private saveFileData(upload: Upload) {
		this.db.list(`${this.basePath}/`).push(upload);
	};

	pushUpload(upload: Upload) {
		const storageRef = this.storage.ref();
		const urlName = upload.file.name;
		const uploadTask = storageRef.child(`${this.basePath}/${urlName}`).put(upload.file);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			function () {
				upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
				upload.url = uploadTask.snapshot.downloadURL;
			},
			(error) => {
				console.log('ERROR', error);
			},
			() => {
				upload.url = uploadTask.snapshot.downloadURL;
				upload.name = upload.file.name;
				this.saveFileData(upload);
			}
		);
	}
}
