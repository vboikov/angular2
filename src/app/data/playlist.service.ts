import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Playlist} from './playlist';
import {Song} from './song';


@Injectable()
export class PlaylistService {
	private amount = 0;
	public itemId: any;
	private items: FirebaseListObservable<Playlist[]>;

	constructor(private db: AngularFireDatabase) {}

	getPlaylists() {
		this.items = <FirebaseListObservable<Playlist[]>>this.db.list('playlists').map(data => {
			this.amount = data.length;
			return data;
		});
		return this.items;
	}

	getPlaylistById(id): any {
		this.itemId = this.db.list('playlists').map(data => {
			return data[id];
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

	updatePlaylist(playlist): void {
		const path = 'playlists/' + playlist.$key;
		this.db.object(path).update(playlist)
		.catch(error => console.log(error));
	}
}
