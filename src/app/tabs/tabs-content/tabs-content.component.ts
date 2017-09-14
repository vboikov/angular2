import { Component, OnInit, OnDestroy , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../data/song.service';


import { Song } from '../../data/song';

@Component({
  moduleId: module.id,
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.css']
})
export class TabsContentComponent implements OnInit, OnDestroy  {
  @Input() data: Song;

  private song: {};
  private id: number;
  private sub;
  private res;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService
) {}
  ngOnInit() {
    this.song = {
      id: 2,
      title: 'No more',
      singer: 'Jackson 5',
      msg: 'Love child',
      active: false
    };
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.res = this.songService.getSongById(this.id).subscribe(song => {
        this.song = song;
      });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.res.unsubscribe();
  }
}
