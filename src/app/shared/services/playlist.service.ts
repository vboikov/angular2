import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Playlist} from '../../interfaces/playlist';
import {Song} from '../../interfaces/song';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class PlaylistService {
	private amount = 0;
	public itemId: any;
	public userToken: string;
	private items: FirebaseListObservable<Playlist[]>;

	constructor(private db: AngularFireDatabase, private authService: AuthService) {
		this.userToken = this.authService.auth2UserToken();
	}

	public getPlaylists() {
		return this.items = <FirebaseListObservable<Playlist[]>>this.db.list('users/' + this.userToken + '/playlists').map(data => {
			this.amount = data.length;
			return data;
		});
	}

	public getPlaylistById(id): any {
		return this.itemId = this.db.list('users/' + this.userToken + '/playlists').map(data => {
			return data[id];
		});
	}

	public addPlaylist(playlist): void {
		this.getPlaylists();
		const itemPlaylist = {
			songs: playlist.songs,
			title: playlist.title,
			id: this.amount
		};
		this.items.push(itemPlaylist);
	}

	deletePlaylist(i): void {
		this.db.object('playlists/' + i).remove();
	}

	public updatePlaylist(playlist): void {
		const path = 'users/' + this.userToken + '/playlists';
		this.db.database.ref(path).child(playlist.$key).update(playlist)
		.catch(error => console.log(error));
	}

	public getNewPlaylist(): any {
		this.getPlaylists();
		return {
			songs: [],
			title: '',
			id: this.amount
		};
	}
}
