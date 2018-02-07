export class Song {
  id: number;
  constructor(public title: string,
              public singer: string,
              public album: string,
              public infoSong: string,
              public url: string) {}
}
