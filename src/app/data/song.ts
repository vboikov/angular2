export class Song {
  id: number;
  constructor(public title: string,
              public singer: string,
              public msg: string,
              public infoSong: any) {}
}
export class Movie {
  id: number;
  constructor(public title: string,
              public director: string,
              public msg: string) {}
}
