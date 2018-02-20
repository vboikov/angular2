import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AddSongComponent} from './addSong/add-song.component'
import {PlaylistsComponent} from './playlists/playlists.component';
import {PlaylistResolver} from './data/playlist.resolver';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './layout/header/header.component';
import {NavComponent} from './layout/nav/nav.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AuthorizedGuard} from './shared/guards/authorized.guard';
import {UnauthorizedGuard} from './shared/guards/unautorized.guard';
import {UploadComponent} from './layout/upload/upload.component';
import {AddListComponent} from './playlists/addlist/addlist.component';
import {PlaylistItemComponent} from './playlists/playlist-item/playlist-item.component';
import {PlaylistEditComponent} from './playlists/playlist-edit/playlist-edit.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [UnauthorizedGuard]
	},
	{
		path: 'musicshelf',
		component: DashboardComponent,
		canActivate: [AuthorizedGuard],
		children: [
			{path: 'addsong', component: AddSongComponent, canActivate: [AuthorizedGuard]},
			{path: 'playlists', component: PlaylistsComponent, canActivate: [AuthorizedGuard]},
			{path: 'addlist', component: AddListComponent, canActivate: [AuthorizedGuard]},
			{
				path: 'playlists-edit/:id',
				component: PlaylistEditComponent,
				canActivate: [AuthorizedGuard],
				resolve: {
					playlist: PlaylistResolver
				}
			},
			{path: 'upload', component: UploadComponent, canActivate: [AuthorizedGuard]},
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes
		)
	],
	exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routedComponents = [
	AppComponent,
	PlaylistsComponent,
	AddSongComponent,
	AuthComponent,
	DashboardComponent,
	HeaderComponent,
	NavComponent,
	FooterComponent,
	UploadComponent,
	AddListComponent,
	PlaylistItemComponent,
	PlaylistEditComponent
];
