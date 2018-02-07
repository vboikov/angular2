import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'header-shelf',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	user: Observable<firebase.User>;
	public loggedUser: any;
	public menuState: boolean = false;
	@Output() messageEvent = new EventEmitter<boolean>();

	constructor(public afAuth: AngularFireAuth, public authService: AuthService, public router: Router) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.loggedUserInfo;
	}



	toogleMenu() {
		this.menuState = !this.menuState;
		this.messageEvent.emit(this.menuState);
	}
}
