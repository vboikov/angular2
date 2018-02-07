import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Playlist} from './playlist';
import {Song} from './song';


@Injectable()
export class PlaylistService {
	private amount: number = 0;
	public itemId: any;
	private items: FirebaseListObservable<Playlist[]>;

	constructor(private db: AngularFireDatabase) {
	}


	getPlaylists() {
		this.items = <FirebaseListObservable<Playlist[]>>this.db.list('playlists').map(data => {
			this.amount = data.length;
			return data;
		});
		return this.items;
	}


	getPlaylistById(id): any {
		this.itemId = <FirebaseListObservable<Playlist>>this.db.list('playlist', ref => ref.orderByChild('id').equalTo(id)).map(data => {
			return data;
		});
		return this.itemId;

	}


	addPlaylist(title, songs: Song[]): void {
		this.getPlaylists();
		const itemPlaylist = {
			songs: songs,
			title: title,
			id: this.amount
		};
		this.items.push(itemPlaylist);
	}

	deletePlaylist(i): void {
		this.db.object('playlists/' + i).remove();
	}

}
