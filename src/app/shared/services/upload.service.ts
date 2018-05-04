import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from '../../interfaces/upload';
import {GoogleApiModule, GoogleApiService, GoogleAuthService} from 'ng-gapi';


@Injectable()
export class UploadService {
	private basePath = '/uploads';
	private storage = firebase.storage();
	private discoveryDocs = [
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
		'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
	];
	public userKey = '851470382067-u1ptf792b66agnv7h1a76mp8hskc9ggt.apps.googleusercontent.com';
	private apiKey = 'AIzaSyAJaVu4nh7bN52UWJ-3grEBx2iMjdjuC9s';
	private gScope = [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.metadata',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive.appfolder'
	];
	public loggedUser: any;
	private userFolder: any;
	constructor(
		private af: AngularFireModule,
		private gapi: GoogleApiModule,
		private gapiService: GoogleApiService,
		private googleAuth: GoogleAuthService,
		private db: AngularFireDatabase) {
	}

	// public getFile(file) {
	// 	const data = 'Bla bla bal bla';
	// 	const src = Rx.Observable.from(data.split(' '));
	// 	rxToStream(file.file).pipe(process.stdout);
	// 	// const fileUpload = file.file.getReader();
	// 	// const stream = new ReadableStream();
	// 	console.log(src);
	// }

	public upload(file) {
		const self = this;
		const reader = new FileReader();
		let dataFile = '';
		reader.onload = function (e) {
			const target: any = e.target;
			dataFile = target.result;
			const audioMetadata = {
				name: file.file.name,
				body: dataFile,
				parents: ['12zRc9Syz2jyhBpfXQQvmBvLVDyV5zlrL'],
				fields: 'webViewLink',
				mimeType: file.file.type
			};
			console.log(audioMetadata);
			gapi.load('client:auth2', () => {
				gapi.client.init({
					apiKey: self.apiKey,
					discoveryDocs: self.discoveryDocs,
					clientId: self.userKey,
					scope: self.gScope.join(' ')
				}).then(() => {
					gapi.client.load('drive', 'v3', () => {
						gapi.client.drive.files.create(audioMetadata).then(data => {
							console.log(data.result.webViewLink);
						});
					});
				});
			});
		};
		reader.readAsArrayBuffer(file.file);
		// const audioMetadata = {
		// 	'name': file.file.name,
		// 	body: fileReader.readAsDataURL(file.file),
		// 	parents : ['12zRc9Syz2jyhBpfXQQvmBvLVDyV5zlrL'],
		// 	fields: 'webViewLink',
		// 	'mimeType': 'text/*'
		// };
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
