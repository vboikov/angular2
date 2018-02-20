import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Song} from './song';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';


@Injectable()
export class SongService {
	private amount: number = 0;
	public itemId: any;
	private items: FirebaseListObservable<Song[]>;

	constructor(private db: AngularFireDatabase) {
	}

	getSongs() {
		this.items = <FirebaseListObservable<Song[]>>this.db.list('songs').map(data => {
			this.amount = data.length;
			return data;
		});
		return this.items;
	}

	getSongById(id): any {
		this.itemId = <FirebaseListObservable<Song>>this.db.list('songs', ref => ref.orderByChild('id').equalTo(id)).map(data => {
			return data;
		});
		return this.itemId;
	}

	addSong(song: Song): void {
		this.getSongs();
		const itemSong = {
			singer: song.singer,
			title: song.title,
			album: song.album,
			infoSong: song.infoSong,
			url: song.url,
			id: this.amount
		};
		this.items.push(itemSong);
	}

	deleteSong(i): void {
		this.db.object('songs/' + i).remove();
	}
}
