import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      {
        id: 0,
        title: 'Show must',
        singer: 'Queen',
        msg: 'Gay'
      },
      {
        id: 1,
        title: 'Du hast',
        singer: 'Ramms',
        msg: 'Gay too'
      },
      {
        id: 2,
        title: 'No more',
        singer: 'Jackson 5',
        msg: 'Love child'
      },
      {
        id: 3,
        title: 'No faith',
        singer: 'Limp Bizkit',
        msg: 'Red hat'
      },
      {
        id: 4,
        title: 'Lullaby',
        singer: 'The Cure',
        msg: 'Love drugs'
      }
    ];

    return{ songs };
  }
}

