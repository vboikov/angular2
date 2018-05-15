import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Song} from '../../interfaces/song';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService} from '../../auth/auth.service';


@Injectable()
export class SongService {
	private amount = 0;
	private items: FirebaseListObservable<Song[]>;

	constructor(private db: AngularFireDatabase, private authService: AuthService) {
	}

	getSongs() {
		const userToken = this.authService.auth2UserToken();
		return this.items = <FirebaseListObservable<Song[]>>this.db.list('users/' + userToken + 'songs/').map(data => {
			this.amount = data.length;
			return data;
		});
	}

	addSong(song: Song, fileId): void {
		const userToken = this.authService.auth2UserToken();
		this.getSongs();
		console.log(this.getSongs());
		if (this.amount === 0) {
			const itemSong = {
				singer: song.singer,
				title: song.title,
				album: song.album,
				infoSong: song.infoSong,
				url: fileId,
				id: 0
			};
			this.db.database.ref('users/' + userToken).child('songs').set(itemSong);
		} else {
			const itemSong = {
				singer: song.singer,
				title: song.title,
				album: song.album,
				infoSong: song.infoSong,
				url: fileId,
				id: this.amount
			};
			this.items.push(itemSong);
		}
	}

	deleteSong(i): void {
		this.db.object('songs/' + i).remove();
	}
}
