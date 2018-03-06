import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {AppRoutingModule, routedComponents} from './router.module';


import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome'

import {AppComponent} from './app.component';
import {SongService} from './shared/services/song.service';
import {SongResolver} from './shared/resolvers/song.resolver';
import {AngularFireAuthModule} from 'angularfire2/auth';


import {AuthService} from './auth/auth.service';
import {AuthorizedGuard} from './shared/guards/authorized.guard';
import {UnauthorizedGuard} from './shared/guards/unautorized.guard';
import {UploadService} from './shared/services/upload.service';
import {PlaylistService} from './shared/services/playlist.service';
import {PlaylistResolver} from './shared/resolvers/playlist.resolver';
import {SearchDirective} from './shared/directives/search.directive';

export const firebaseConfig = {
	apiKey: 'AIzaSyDS3RNx9aIYvPdC6HTN8CV3ssHq7sqnmpg',
	authDomain: 'musicshelf-abe0d.firebaseapp.com',
	databaseURL: 'https://musicshelf-abe0d.firebaseio.com',
	projectId: 'musicshelf-abe0d',
	storageBucket: 'musicshelf-abe0d.appspot.com',
	messagingSenderId: '851470382067'
};


@NgModule({
	declarations: [
		SearchDirective,
		routedComponents
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule,
		AppRoutingModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		Angular2FontawesomeModule
	],
	providers: [
		SongService,
		PlaylistService,
		SongResolver,
		AuthService,
		AuthorizedGuard,
		UnauthorizedGuard,
		UploadService,
		PlaylistResolver
	],
	bootstrap: [AppComponent]
})


export class AppModule {
}
