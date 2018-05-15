import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-nav-shelf',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	public loggedUser: any;

	constructor(public authService: AuthService, public router: Router) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.auth2UserToken;
	}

	logout() {
		this.authService.logOut();
		this.router.navigate(['/auth']);
		this.loggedUser = this.authService.auth2UserToken;
	}


}
