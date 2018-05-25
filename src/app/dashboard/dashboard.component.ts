import {Component} from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	public menuState: boolean;

	constructor() {}

	public receiveMessage($event): void {
		this.menuState = $event;
	}

}
