import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {GoogleApiModule, GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {AuthService} from '../../auth/auth.service';
import {SpinnerService} from '../spinner/spinner.service';


@Injectable()
export class GapiService {
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

	constructor(private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService,
	            private googleAuth: GoogleAuthService,
	            private spinnerService: SpinnerService,
	            private authService: AuthService) {
		this.gapiService.onLoad().subscribe(() => {
			this.loadGapiClient();
		});
	}

	public loadGapiClient(): void {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: this.apiKey,
				discoveryDocs: this.discoveryDocs,
				clientId: this.userKey,
				scope: this.gScope.join(' ')
			});
		});
	}
}