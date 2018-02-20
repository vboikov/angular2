import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'nav-shelf',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	user: Observable<firebase.User>;
	public loggedUser: any;

	constructor(public afAuth: AngularFireAuth, public authService: AuthService, public router: Router) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.loggedUserInfo;
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/auth']);
		this.loggedUser = this.authService.loggedUserInfo;
	}


}
