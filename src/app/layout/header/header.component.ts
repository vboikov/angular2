import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-header-shelf',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public loggedUser: any;
	public menuState = false;
	@Output() messageEvent = new EventEmitter<boolean>();

	constructor(public authService: AuthService, public router: Router) {
	}

	ngOnInit() {
		this.loggedUser = this.authService.loggedUserInfo;
	}

	toogleMenu() {
		this.menuState = !this.menuState;
		this.messageEvent.emit(this.menuState);
	}
}
