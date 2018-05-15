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
	public songs: any;
	constructor(private db: AngularFireDatabase, private authService: AuthService) {
	}

	getSongs() {
		const userToken = this.authService.auth2UserToken();
		this.items = <FirebaseListObservable<Song[]>>this.db.list('users/' + userToken + 'songs/').map(data => {
			return data;
		});
		return this.items;
	}

	addSong(song: Song, fileId): void {
		const userToken = this.authService.auth2UserToken();
		const itemSong = {
			singer: song.singer,
			title: song.title,
			album: song.album,
			infoSong: song.infoSong,
			url: fileId
		};
		this.songs = this.getSongs().subscribe((data) => {
			if (data.length) {
				this.db.database.ref('users/' + userToken).child('songs').push(itemSong);
			}
		});
	}

	deleteSong(i): void {
		this.db.object('songs/' + i).remove();
	}
}
