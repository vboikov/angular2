import {Song} from './song';
import {Playlist} from './playlist';

export interface User {
	$key: string;
	info: Userinfo;
	songs: Song[];
	playlists: Playlist[];
}

export interface Userinfo {
	token: string;
	name: string;
}
