import {Song} from './song';
export interface Playlist {
	id: number;
	title: string;
	songs: Song[];
}
