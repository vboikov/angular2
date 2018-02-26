import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {PlaylistService} from './playlist.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class PlaylistResolver implements Resolve<FirebaseObjectObservable<any>> {

	constructor(private playlistService: PlaylistService) {
	}

	resolve(route: ActivatedRouteSnapshot,
	        state: RouterStateSnapshot): Promise<FirebaseObjectObservable<any>> {

		const url = route.params['id'];

		return this.playlistService.getPlaylistById(url).first();
	}
}
