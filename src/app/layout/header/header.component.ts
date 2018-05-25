import {Component, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-header-shelf',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	public menuState = false;
	@Output() messageEvent = new EventEmitter<boolean>();

	constructor(public router: Router) {}

	public toogleMenu(): void {
		this.menuState = !this.menuState;
		this.messageEvent.emit(this.menuState);
	}
}
