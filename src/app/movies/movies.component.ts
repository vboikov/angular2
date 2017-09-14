import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Song } from '../data/song';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  hello = 'HELLO HOLYWOOD!';
  @Input() data: Song[];
  @Output() idx: EventEmitter<number> = new EventEmitter<number>();

  onClickIdx(i) {
    this.idx.emit(i);
  }

}
