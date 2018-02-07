import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MovieService {
	public posterURL: string;
	public movie: any;

	constructor(public http: Http) {
	}


	public loadMovie() {
		// this.http.get('https://api.themoviedb.org/3/movie/550?api_key=2a483a6941178a0355c5cc9f27f3c86e').subscribe( data => {
		//   let srcImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
		//   this.movie = data.json();
		//   this.posterURL = srcImg.concat(this.movie.poster_path);
		//   return this.movie;
		// });
		this.http.get('https://api.themoviedb.org/3/movie/550?api_key=2a483a6941178a0355c5cc9f27f3c86e').map((data) => {
			let srcImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
			this.movie = data.json();
			this.posterURL = srcImg.concat(this.movie.poster_path);
			return this.movie;
		});
	}


}
