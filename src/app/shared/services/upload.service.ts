import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {GoogleApiModule, GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {AuthService} from '../../auth/auth.service';


@Injectable()
export class UploadService {
	private discoveryDocs = [
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
		'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
	];
	private userKey = '851470382067-u1ptf792b66agnv7h1a76mp8hskc9ggt.apps.googleusercontent.com';
	private apiKey = 'AIzaSyAJaVu4nh7bN52UWJ-3grEBx2iMjdjuC9s';
	private gScope = [
		'https://www.googleapis.com/auth/drive',
		'https://www.googleapis.com/auth/drive.metadata',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive.appfolder'
	];
	public uploadPercent: number;

	constructor(private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService,
	            private googleAuth: GoogleAuthService,
	            private authService: AuthService) {
		this.gapiService.onLoad().subscribe(() => {
			this.loadGapiClient();
		});
	}

	public loadGapiClient() {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: this.apiKey,
				discoveryDocs: this.discoveryDocs,
				clientId: this.userKey,
				scope: this.gScope.join(' ')
			}).then(() => {
			});
		});
	}

	public upload(file) {
		const self = this;
		const contentType = file.type || 'application/octet-stream';
		const folderId = this.authService.getFolderId();
		const user = gapi.auth2.getAuthInstance().currentUser.get();
		const oauthToken = user.getAuthResponse().access_token;

		function initPromise() {
			return new Promise((resolve) => {
				const initRequest = new XMLHttpRequest();
				initRequest.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', true);
				initRequest.setRequestHeader('Authorization', 'Bearer ' + oauthToken);
				initRequest.setRequestHeader('Content-Type', 'application/json');
				initRequest.setRequestHeader('X-Upload-Content-Length', file.size);
				initRequest.setRequestHeader('X-Upload-Content-Type', contentType);
				initRequest.onreadystatechange = function () {
					if (initRequest.readyState === XMLHttpRequest.DONE && initRequest.status === 200) {
						return resolve(initRequest.getResponseHeader('Location'));
					}
				};
				initRequest.send(JSON.stringify({
					'name': file.name,
					'parents': [folderId],
					'mimeType': contentType,
					'Content-Type': contentType,
					'Content-Length': file.size
				}));
			});
		}

		function initUpload(data) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(file);
				reader.onload = () => {
					const uploadRequest = new XMLHttpRequest();
					uploadRequest.open('PUT', data, true);
					uploadRequest.setRequestHeader('Content-Type', contentType);
					uploadRequest.setRequestHeader('X-Upload-Content-Type', contentType);
					uploadRequest.upload.addEventListener('progress', (event) => {
						self.uploadPercent = (event.loaded / event.total * 100 | 0);
						console.log(self.uploadPercent);
					});
					uploadRequest.onload = function () {
						if (uploadRequest.status === 200) {
							const resp = JSON.parse(uploadRequest.response);
							resolve(resp.id);
						} else {
							reject(new Error('Error'));
						}
					};
					uploadRequest.send(reader.result);
				};
			});
		}

		return initPromise()
		.then((data) => initUpload(data));
	}


}
