import {Component, OnInit, Input, ViewChild, EventEmitter} from '@angular/core';
import {FormsModule, NgForm, NgControl} from '@angular/forms'
import {Router} from '@angular/router';


@Component({
	selector: 'app-add-playlist',
	templateUrl: './addlist.component.html',
	styleUrls: ['./addlist.component.css']
})


export class AddListComponent implements OnInit {
	@ViewChild('addPlaylistForm') formControlDir: NgForm;
	@ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

	formValue: any;
	nameValue: string;

	constructor(private router: Router) {
	};


	ngOnInit() {

		this.formControlDir.form.valueChanges.subscribe(value => {
			this.formValue = value;
		});

		this.nameControlDir.control.valueChanges.subscribe(value => {
			this.nameValue = value;
		});

	}

	onSubmit(obj) {

	}
}
