import { Component, OnInit, OnDestroy, Input,  Output, EventEmitter } from '@angular/core';
import { Song } from '../../data/song';
import { Router, ActivatedRoute, RouterLinkActive  } from '@angular/router';
import { SongService } from '../../data/song.service';

@Component({
  selector: 'app-tabs-triggers',
  templateUrl: './tabs-triggers.component.html',
  styleUrls: ['./tabs-triggers.component.css']
})
export class TabsTriggersComponent {
  @Input() data: Song[];
  @Output() idx = new EventEmitter<number>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private songService: SongService
  ) {}


  onChangeSong(i) {
    this.idx.emit(i);
  }


  deleteSong(i){
    this.songService.deleteSong(i);
  }

  ngOnInit(){

  }


}
