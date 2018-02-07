import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AuthService {
	public isAuthorized$: Observable<boolean>;
	private _isAuthorizedSubject: Subject<boolean>;
	private _isAuthorized: boolean;
	authState: any = null;
	public userKey: string = 'firebase:authUser:AIzaSyDS3RNx9aIYvPdC6HTN8CV3ssHq7sqnmpg:[DEFAULT]';

	constructor(private afAuth: AngularFireAuth,
	            private db: AngularFireDatabase,
	            private router: Router) {
		this.afAuth.authState.subscribe((auth) => {
			this.authState = auth
		});
		this._isAuthorizedSubject = new Subject<boolean>();
		this.isAuthorized$ = this._isAuthorizedSubject.asObservable();
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

	//TODO logic for get user from localstorage
	get loggedUserInfo() {
		return JSON.parse(localStorage.getItem(this.userKey));
	}

	get authenticated(): boolean {
		return this.authState !== null;
	}

	get currentUser(): any {
		return this.authenticated ? this.authState : null;
	}

	get currentUserId(): string {
		return this.authenticated ? this.authState.uid : '';
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
			this.updateUserData()
		})
		.catch(error => console.log(error));
	}

	private updateUserData(): void {
		let path = `users/${this.currentUserId}`;
		let data = {
			email: this.authState.email,
			name: this.authState.displayName
		}

		this.db.object(path).update(data)
		.catch(error => console.log(error));

	}


}
