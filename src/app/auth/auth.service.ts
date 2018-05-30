import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleApiModule, GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {User} from '../interfaces/user';
import {Subscription} from 'rxjs/Subscription';
import {GapiInitService} from '../shared/services/gapiInit.service';

@Injectable()
export class AuthService {
	private LOCAL_STORAGE_KEY = 'accessToken';
	private userFolder: any;
	public appUsers$: any;
	public existUser: User;
	public sub: Subscription;

	constructor(private afAuth: AngularFireAuth,
	            private db: AngularFireDatabase,
	            private router: Router,
	            private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService,
	            private gapiInitService: GapiInitService,
	            private googleAuth: GoogleAuthService) {
		this.gapiInitService.initGapi();
	}


	public getUsers(): FirebaseListObservable<User[]> {
		return this.appUsers$ = <FirebaseListObservable<User[]>>this.db.list('users').map(data => {
			return data;
		});
	}

	public auth2UserToken(): string {
		return localStorage.getItem('accessToken');
	}

	public setFolderId(id: string) {
		localStorage.setItem('folderId', id);
	}

	public getFolderId(): string {
		return localStorage.getItem('folderId');
	}

	public signIn(): void {
		this.googleAuth.getAuth().subscribe((auth) => {
			auth.signIn().then(res => {
				this.signInSuccessHandler(res);
			});
		});
	}

	public signInSuccessHandler(res: GoogleUser): void {
		const TOKEN = res.getAuthResponse().login_hint;
		/***
		 * Save user to base
		 ***/
		this.sub = this.getUsers().subscribe((data) => {
			this.existUser = data.find(item => item.info.token === TOKEN);
			if (!this.existUser) {
				const startObj = {
					info: {
						token: TOKEN,
						name: ''
					},
					songs: [],
					playlists: []
				};
				this.db.database.ref('users/' + TOKEN).set(startObj);
			}
		});
		localStorage.setItem(this.LOCAL_STORAGE_KEY, TOKEN);
		this.updateSigninStatus(res);
	}

	public logOut(): void {
		localStorage.removeItem(this.LOCAL_STORAGE_KEY);
		localStorage.removeItem('folderId');
		gapi.auth2.getAuthInstance().signOut();
	}

	private updateSigninStatus(isSignedIn): void {
		if (isSignedIn) {
			this.checkFolder();
			this.router.navigate(['/musicshelf/playlists']);
		} else {
			alert('Please auth!');
		}
	}

	/***
	 * Google drive list files
	 ***/
	private checkFolder(): void {
		gapi.client.load('drive', 'v3', () => {
			gapi.client.drive.files.list({
				q: 'mimeType=\'application/vnd.google-apps.folder\'',
				fields: 'files(id, name)'
			}).then((res) => {
				const folders = res.result.files;
				this.userFolder = folders.find(item => item.name === 'MusicShelf');
				if (this.userFolder) {
					this.setFolderId(this.userFolder.id);
					console.log('Folder exist!');
				} else {
					const fileMetadata = {
						'name': 'MusicShelf',
						'mimeType': 'application/vnd.google-apps.folder'
					};
					gapi.client.drive.files.create(fileMetadata).then((data) => {
						if (data.status === 200) {
							console.log('Folder was created!');
							this.setFolderId(data.result.id);
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
