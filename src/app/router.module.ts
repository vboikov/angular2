import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {TabsComponent} from './tabs/tabs.component';
import {TabsTriggersComponent} from './tabs/tabs-triggers/tabs-triggers.component';
import {TabsContentComponent} from './tabs/tabs-content/tabs-content.component';
import {AddSongComponent} from './addSong/add-song.component'
import {PlaylistsComponent} from './playlists/playlists.component';
import {SongResolver} from './data/song.resolver';
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
			{path: 'upload', component: UploadComponent, canActivate: [AuthorizedGuard]},
			// {path: 'songs', component: TabsComponent, canActivate: [AuthorizedGuard]}
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
	TabsTriggersComponent,
	TabsContentComponent,
	TabsComponent,
	PlaylistsComponent,
	AddSongComponent,
	AuthComponent,
	DashboardComponent,
	HeaderComponent,
	NavComponent,
	FooterComponent,
	UploadComponent,
	AddListComponent,
	PlaylistItemComponent
];
