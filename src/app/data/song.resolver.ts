import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Song } from './song';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { SongService } from './song.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class SongResolver implements Resolve<FirebaseObjectObservable<any>> {

  constructor(private songService: SongService, private db: AngularFireDatabase) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<FirebaseObjectObservable<any>> {

    let url = route.params['id'];
    let song = this.db.list('songs/' + url);
    // console.log(song);
    return new Promise((resolve,reject) => {
      song.first().subscribe(() => {
        // console.log(song);
        resolve(song)
      }, reject)
    });
    // return this.songService.getSongById(route.params['id']);

  }
}
