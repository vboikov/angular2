import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AddSongComponent} from './addSong/add-song.component'
import {PlaylistsComponent} from './playlists/playlists.component';
import {PlaylistResolver} from './shared/resolvers/playlist.resolver';
import {AuthComponent} from './auth/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './layout/header/header.component';
import {NavComponent} from './layout/nav/nav.component';
import {PlayerComponent} from './layout/player/player.component';
import {AuthorizedGuard} from './shared/guards/authorized.guard';
import {UnauthorizedGuard} from './shared/guards/unautorized.guard';
import {UploadComponent} from './layout/upload/upload.component';
import {PlaylistAddComponent} from './playlists/playlist-add/playlist-add.component';
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
			{path: 'playlist-add', component: PlaylistAddComponent, canActivate: [AuthorizedGuard]},
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
	PlayerComponent,
	UploadComponent,
	PlaylistAddComponent,
	PlaylistItemComponent,
	PlaylistEditComponent
];
