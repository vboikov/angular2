import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Song } from './song';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";





@Injectable()
export class SongService {
  private items: FirebaseListObservable<Song[]>;
  private item: FirebaseObjectObservable<any>;
  constructor(private db: AngularFireDatabase ) {}


  getSongs(){
    this.items = <FirebaseListObservable<Song[]>>this.db.list("songs").map(data => {
        return data;
    });
    // this.items.subscribe(items => {
    //   return items;
    // });
    return this.items;
  }

  getSongById(id): FirebaseObjectObservable<Song>{
    return <FirebaseObjectObservable<Song>>this.db.object("songs/" + id).map(data => {
      return data;
    });
  }

  addSong(song: Song): void{
    this.items.push({singer: song.singer, title: song.title, msg: song.msg, infoSong: song.infoSong, id: song.id})
  }

  deleteSong(i): void{
    this.db.object("songs/" + i).remove();
  }

}
