import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsTriggersComponent } from './tabs/tabs-triggers/tabs-triggers.component';
import { TabsContentComponent } from './tabs/tabs-content/tabs-content.component';
import { MoviesComponent } from './movies/movies.component';

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
      { path: ':id', component: TabsContentComponent }
    ]
  },
  {path: 'movies', component: MoviesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
    // other imports here
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routedComponents = [
  AppComponent,
  TabsTriggersComponent,
  TabsContentComponent,
  TabsComponent,
  MoviesComponent
];
