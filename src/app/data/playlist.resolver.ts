import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Playlist} from './playlist';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {PlaylistService} from './playlist.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class PlaylistResolver implements Resolve<FirebaseObjectObservable<any>> {

	constructor(private playlistService: PlaylistService, private db: AngularFireDatabase) {
	}

	resolve(route: ActivatedRouteSnapshot,
	        state: RouterStateSnapshot): Promise<FirebaseObjectObservable<any>> {

		let url = route.params['id'];

		return this.playlistService.getPlaylistById(url).first();
		// let playlist = this.db.list('playlists/' + url);
		// return new Promise((resolve, reject) => {
		// 	playlist.first().subscribe(() => {
		// 		resolve(playlist[0])
		// 	}, reject)
		// });
	}
}
