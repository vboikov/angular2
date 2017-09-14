import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Song } from '../../data/song';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-triggers',
  templateUrl: './tabs-triggers.component.html',
  styleUrls: ['./tabs-triggers.component.css']
})
export class TabsTriggersComponent {
  @Input() data: Song[];
  @Output() idx: EventEmitter<number> = new EventEmitter<number>();
  public activeIndex;
  constructor(
    private router: Router
  ) {}
  onClickIdx(i) {
    this.idx.emit(i);
  }

  onClickChangeState(idx) {
    this.router.navigate(['songs/' + this.data[idx].id]);
    this.activeIndex = idx;
  }


}
