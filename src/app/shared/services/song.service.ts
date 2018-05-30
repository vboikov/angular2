import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Song} from '../../interfaces/song';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService} from '../../auth/auth.service';


@Injectable()
export class SongService {
	private items: FirebaseListObservable<Song[]>;
	public songs: any;
	public userToken: string;
	constructor(private db: AngularFireDatabase, private authService: AuthService) {
		this.userToken = this.authService.auth2UserToken();
	}

	public getSongs(): FirebaseListObservable<Song[]> {
		return this.items = <FirebaseListObservable<Song[]>>this.db.list('users/' + this.userToken + '/songs').map((data) => {
			return data;
		});
	}

	public addSong(song: Song, fileId): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const itemSong = {
				singer: song.singer,
				title: song.title,
				album: song.album,
				infoSong: song.infoSong,
				url: fileId
			};
			resolve(this.db.database.ref('users/' + this.userToken).child('songs').child(fileId).set(itemSong));
			reject(new Error('Error when you add file'));
		});
	}
}
