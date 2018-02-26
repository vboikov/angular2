import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	public loggedUser: any;

	constructor(public authService: AuthService, public router: Router) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.loggedUserInfo;
	}

	login() {
		this.authService.googleLogin().then(data => {
			this.authService.isAuthorized = true;
			this.loggedUser = this.authService.currentUser;
			this.router.navigate(['/musicshelf/playlists']);
		});
	}
}
