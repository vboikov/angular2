import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	public menuState: boolean;
	@ViewChild(HeaderComponent) child;

	constructor() {
	}

	receiveMessage($event) {
		this.menuState = $event;
	}

}
