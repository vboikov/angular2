import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsTriggersComponent } from './tabs/tabs-triggers/tabs-triggers.component';
import { TabsContentComponent } from './tabs/tabs-content/tabs-content.component';
import { AddSongComponent } from './addSong/add-song.component'
import { MoviesComponent } from './movies/movies.component';
import { SongResolver } from './data/song.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full'
  },
  {
    path: 'songs',
    component: TabsComponent,
    children: [
      { path: '', redirectTo: 'songs/0', pathMatch: 'full' },
      { path: ':id',
        component: TabsContentComponent,
        resolve: {
          song: SongResolver
        }
      }
    ]
  },
  {path: 'movies', component: MoviesComponent},
  {path: 'addsong', component: AddSongComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [
  AppComponent,
  TabsTriggersComponent,
  TabsContentComponent,
  TabsComponent,
  MoviesComponent,
  AddSongComponent
];
