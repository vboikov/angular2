import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SpinnerService {
	private counter = 0;
	private subject: Subject<number>;
	public state$: Observable<number>;

	constructor() {
		this.subject = new Subject();
		this.state$ = this.subject.asObservable();
	}

	public show(): void {
		this.counter += 1;
		this.subject.next(this.counter);
	}

	public hide(): void {
		this.counter = 0;
		this.subject.next(this.counter);
	}
}