import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Song } from '../data/song';
import { SongService } from '../data/song.service';
import { FormsModule, NgForm, NgControl  } from '@angular/forms'
import {Router} from "@angular/router";


@Component({
  selector: 'app-add',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})


export class AddSongComponent implements OnInit {
  @Input() data: Song[];
  @ViewChild('addSongForm') formControlDir: NgForm;
  @ViewChild('nameControl', {read: NgControl}) nameControlDir: NgControl;

  song: Song;
  formValue: any;
  nameValue: string;



  constructor(
    private route: Router,
    private songService: SongService) {
  };


  ngOnInit() {

    this.formControlDir.form.valueChanges.subscribe(value => {
      this.formValue = value;
    });

    this.nameControlDir.control.valueChanges.subscribe(value => {
      this.nameValue = value;
    });

  }

  onSubmit(obj){
    this.songService.addSong(obj);
    this.route.navigateByUrl('/songs');
  }

}
