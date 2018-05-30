import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {GoogleApiModule} from 'ng-gapi';
import {GapiInitService} from '../shared/services/gapiInit.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	constructor(public authService: AuthService,
	            public router: Router,
	            private gapi: GoogleApiModule,
	            private gapiInitService: GapiInitService) {
	}

	ngOnInit() {
		this.gapiInitService.initGapi();
	}

	/**
	 * Login & logout
	 * **/
	public loginGoogleDrive(): void {
		gapi.auth2.getAuthInstance().signIn().then((user) => {
			if (user) {
				this.authService.signIn();
				this.authService.signInSuccessHandler(user);
			}
		});
	}
}
