import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Song } from './song';


@Injectable()
export class SongService {
  private apiUrl = 'api/songs';

  constructor(private http: Http) {}

  getSongs(): Observable<Song[]> {
    return this.http.get(this.apiUrl)
      .map(res => res.json().data);
  }
  getSongById(id): Observable<Song> {
    return this.http.get(this.apiUrl + '/' + id)
      .map(res => res.json().data);
  }
}
