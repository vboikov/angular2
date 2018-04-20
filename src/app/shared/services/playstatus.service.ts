import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PlaystatusService {
	public isPlayId$: Observable<number>;
	public _isPlayIdSubject$: Subject<number>;

	constructor() {
		this._isPlayIdSubject$ = new Subject<number>();
		this.isPlayId$ = this._isPlayIdSubject$.asObservable();
	}

	set isPlayId(value: number) {
		this._isPlayIdSubject$.next(value);
	}
}
