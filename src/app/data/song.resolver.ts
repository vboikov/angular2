import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SongService} from './song.service';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class SongResolver implements Resolve<FirebaseObjectObservable<any>> {

	constructor(private songService: SongService, private db: AngularFireDatabase) {
	}

	resolve(route: ActivatedRouteSnapshot,
	        state: RouterStateSnapshot): Promise<FirebaseObjectObservable<any>> {
		const url = route.params['id'];
		const song = this.db.list('songs/' + url);
		return new Promise((resolve, reject) => {
			song.first().subscribe(() => {
				resolve(song[0]);
			}, reject);
		});
	}
}
