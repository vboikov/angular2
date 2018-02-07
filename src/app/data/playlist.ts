import {Song} from './song';
export class Playlist {
	id: number;
	constructor(public title: string,
	            public songs: Song[]) {}
}
