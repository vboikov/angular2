import {Component, OnInit, HostBinding} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.css']

})
export class SpinnerComponent implements OnInit {
	@HostBinding('class.untouch') state = true;

	constructor(protected spinnerService: SpinnerService) {
		this.state = false;
	}


	ngOnInit() {
		this.spinnerService.state$.subscribe((stateSer: number) => {
			Promise.resolve(null).then(() => {
				this.state = stateSer > 0;
			});
		});
	}
}
