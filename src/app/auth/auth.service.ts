import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleApiModule, GoogleApiService, GoogleAuthService} from 'ng-gapi';

@Injectable()
export class AuthService {
	private SESSION_STORAGE_KEY = 'accessToken';
	public isAuthorized$: Observable<boolean>;
	private _isAuthorizedSubject: Subject<boolean>;
	private _isAuthorized: boolean;
	public authState: any = null;
	public loggedUser: any;
	private userFolder: any;
	public userKey = 'firebase:authUser:AIzaSyDS3RNx9aIYvPdC6HTN8CV3ssHq7sqnmpg:[DEFAULT]';
	public googleUser: GoogleUser;
	private discoveryDocs = [
		'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
		'https://www.googleapis.com/discovery/v1/apis/people/v1/rest'
	];
	private apiKey = 'AIzaSyAJaVu4nh7bN52UWJ-3grEBx2iMjdjuC9s';
	private gScope = [
		'https://www.googleapis.com/auth/drive.metadata',
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive.appfolder'
	];

	constructor(private afAuth: AngularFireAuth,
	            private db: AngularFireDatabase,
	            private router: Router,
	            private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService,
	            private googleAuth: GoogleAuthService) {
		this.afAuth.authState.subscribe((auth) => {
			this.authState = auth;
		});
		this._isAuthorizedSubject = new Subject<boolean>();
		this.isAuthorized$ = this._isAuthorizedSubject.asObservable();
		this.gapiService.onLoad().subscribe(() => {
			this.loadGapiClient();
		});
	}

	set isAuthorized(value: boolean) {
		this._isAuthorized = value;
		this._isAuthorizedSubject.next(this._isAuthorized);

		if (!this._isAuthorized) {
			this.router.navigate(['/auth']);
		}
	}

	get isAuthorized(): boolean {
		return this._isAuthorized;
	}

	get loggedUserInfo() {
		return JSON.parse(localStorage.getItem(this.userKey));
	}

	get auth2UserToken() {
		return sessionStorage.getItem('accessToken');
	}

	get authenticated(): boolean {
		return this.authState !== null;
	}

	get currentUser(): any {
		return this.authenticated ? this.authState : null;
	}

	googleLogin() {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.socialSignIn(provider);
	}

	logout() {
		this.afAuth.auth.signOut();
		this.isAuthorized = false;
		this.router.navigate(['/']);
	}

	private socialSignIn(provider) {
		return this.afAuth.auth.signInWithPopup(provider)
		.then((credential) => {
			this.isAuthorized = true;
			this.authState = credential.user;
		})
		.catch(error => console.log(error));
	}


	public getToken(): string {
		const token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
		if (!token) {
			throw new Error('no token set , authentication required');
		}
		return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
	}

	public signIn(): void {
		console.log('Service');
		this.googleAuth.getAuth().subscribe((auth) => {
			auth.signIn().then(res => this.signInSuccessHandler(res));
		});

	}

	public signInSuccessHandler(res: GoogleUser) {
		this.googleUser = res;
		sessionStorage.setItem(
			this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
		);
		this.router.navigate(['/musicshelf/playlists']);

	}

	public loginGoogleDrive() {
		gapi.auth2.getAuthInstance().signIn().then((user) => {
			if (user) {
				this.router.navigate(['/musicshelf/playlists']);
			}
		});
	}

	public loginOut() {
		gapi.auth2.getAuthInstance().signOut();
	}

	/**
	 * Load GAPI
	 * */
	public loadGapiClient() {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: this.apiKey,
				discoveryDocs: this.discoveryDocs,
				clientId: '851470382067-u1ptf792b66agnv7h1a76mp8hskc9ggt.apps.googleusercontent.com',
				scope: this.gScope.join(' ')
			}).then(() => {
				this.listenForAuth();
			});
		});
	}

	private listenForAuth() {
		const GoogleAuth = gapi.auth2.getAuthInstance();
		const user = GoogleAuth.currentUser.get();

		if (user) {
			this.isAuthorized = true;
			this.signInSuccessHandler(user);
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
		this.googleLogin().then(data => {
			this.isAuthorized = true;
			this.loggedUser = this.currentUser;
			this.router.navigate(['/musicshelf/playlists']);
		});
	}


	/*
	* Google drive list files
	* */
	private listFiles() {
		gapi.client.load('drive', 'v3', () => {
			gapi.client.drive.files.list({
				q: 'mimeType=\'application/vnd.google-apps.folder\'',
				fields: 'files(id, name)'
			}).then((res) => {
				const folders = res.result.files;
				this.userFolder = folders.find(item => item.name === 'MusicShelf');
				if (this.userFolder) {
					console.log('Folder exist!');
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
