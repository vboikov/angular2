import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {GoogleApiModule, GoogleApiService} from 'ng-gapi';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	constructor(public authService: AuthService,
	            public router: Router,
	            private gapi: GoogleApiModule,
	            private gapiService: GoogleApiService) {
	}

	ngOnInit() {
		this.gapiService.onLoad().subscribe(() => {
			this.authService.loadGapiClient();
		});
	}

	/**
	 * Login & logout
	 * **/
	public loginGoogleDrive() {
		gapi.auth2.getAuthInstance().signIn().then((user) => {
			if (user) {
				this.authService.signIn();
				this.authService.signInSuccessHandler(user);
			}
		});
	}
}
