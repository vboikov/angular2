import { Component, OnInit, OnDestroy, Input,  Output, EventEmitter } from '@angular/core';
import { Song } from '../../data/song';
import { Router, ActivatedRoute, RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-tabs-triggers',
  templateUrl: './tabs-triggers.component.html',
  styleUrls: ['./tabs-triggers.component.css']
})
export class TabsTriggersComponent {
  @Input() data: Song[];
  @Output() idx: EventEmitter<number> = new EventEmitter<number>();

  public activeIndex: number;
  public check;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  onClickIdx(i) {
    this.idx.emit(i);
  }


}
