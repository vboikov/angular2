import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../data/song';
import { SongService } from '../data/song.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html'
})


export class TabsComponent implements OnInit {
  @Input() data: Song[];
  @Output() idx: EventEmitter<number> = new EventEmitter<number>();




  song: Song;
  songs: Song[];

  constructor(
    private songService: SongService) {
    this.songs = [];
  };
  ngOnInit() {

    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

}
