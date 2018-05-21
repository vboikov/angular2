import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PlaystatusService {
	public isPlayId$: Observable<string>;
	public _isPlayIdSubject$: Subject<string>;

	constructor() {
		this._isPlayIdSubject$ = new Subject<string>();
		this.isPlayId$ = this._isPlayIdSubject$.asObservable();
	}

	set isPlayId(value: string) {
		this._isPlayIdSubject$.next(value);
	}
}
