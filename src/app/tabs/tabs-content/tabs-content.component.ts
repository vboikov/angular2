import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../data/song.service';
import { SongResolver } from '../../data/song.resolver';


import { Song } from '../../data/song';

@Component({
  moduleId: module.id,
  selector: 'app-tabs-content',
  templateUrl: './tabs-content.component.html',
  styleUrls: ['./tabs-content.component.css']
})
export class TabsContentComponent implements OnInit, OnDestroy  {
  private id: number;
  private res;
  public song: Song;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private songResolver: SongResolver
) {}


  ngOnInit() {
    this.res = this.route.params.subscribe(data => {
      this.songService.getSongById(data['id']).subscribe(res => {
        this.song = res[data['id']];
      })
    });
  }

  ngOnDestroy() {
    this.res.unsubscribe();
  }
}
