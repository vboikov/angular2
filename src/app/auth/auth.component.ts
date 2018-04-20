import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {
	GoogleApiModule, GoogleApiService,
	GoogleAuthService,
	NgGapiClientConfig,
	NG_GAPI_CONFIG,
	GoogleApiConfig
} from 'ng-gapi';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	public loggedUser: any;
	private userFolder: any;

	constructor(public authService: AuthService,
	            public router: Router,
	            private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.loggedUserInfo;
		this.gapiService.onLoad().subscribe(() => {
			this.loadGapiClient();
		});

	}
	/**
	 * Login & logout
	 * **/
	public loginGoogleDrive() {
		gapi.auth2.getAuthInstance().signIn().then((user) => {
			if (user) {
				// this.router.navigate(['/musicshelf/playlists']);
			}
		});
	}

	public loginOut() {
		gapi.auth2.getAuthInstance().signOut();
	}

	/**
	 * Load GAPI
	 * */
	private loadGapiClient() {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: 'AIzaSyAJaVu4nh7bN52UWJ-3grEBx2iMjdjuC9s',
				discoveryDocs: [
					'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
					'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'],
				clientId: '851470382067-u1ptf792b66agnv7h1a76mp8hskc9ggt.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appfolder'
			}).then(() => {
				gapi.client.load('people', 'v1', () => {
					this.listenForAuth();
				});

			});
		});
	}

	private listenForAuth() {
		const GoogleAuth = gapi.auth2.getAuthInstance();
		const user = GoogleAuth.currentUser.get();

		if (user) {
			this.authService.isAuthorized = true;
			this.authService.signInSuccessHandler(user);
			// this.router.navigate(['/musicshelf/playlists']);
		}
		/**
		 *    Listen for sign-in state changes.
		 */
		GoogleAuth.isSignedIn.listen(this.updateSigninStatus.bind(this));
		/**
		 *    Handle the initial sign-in state.
		 */

		this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	}


	private updateSigninStatus(isSignedIn) {
		// When signin status changes, this function is called.
		// If the signin status is changed to signedIn, we make an API call.
		if (isSignedIn) {
			this.listFiles();
		} else {
			alert('Please auth!');
		}
	}

	login() {
		this.authService.googleLogin().then(data => {
			this.authService.isAuthorized = true;
			this.loggedUser = this.authService.currentUser;
			this.router.navigate(['/musicshelf/playlists']);
		});
	}




	/*
	* Google drive list files
	* */
	private listFiles() {
		gapi.client.load('drive', 'v3', () => {
			gapi.client.drive.files.list({
				q: "mimeType='application/vnd.google-apps.folder'",
				fields: 'files(id, name)'
			}).then((res) => {
				const folders = res.result.files;
				this.userFolder = folders.find(item => item.name === 'MusicShelf');
				if (this.userFolder) {
					console.log(this.userFolder, this.userFolder.id);
				} else {
					const fileMetadata = {
						'name': 'MusicShelf',
						'mimeType': 'application/vnd.google-apps.folder'
					};
					gapi.client.drive.files.create(fileMetadata).then((data) => {
						if (data.status === 200) {
							console.log(data);
						} else {
							alert('Something went wrong! ;(');
							console.log(data);
						}
					});
				}
			});

		});
	}

}
