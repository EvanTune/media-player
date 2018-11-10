import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {ActionBarComponent} from './components/action-bar/action-bar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {ControlsComponent} from './components/controls/controls.component';
import {VolumeComponent} from './components/volume/volume.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {TrackInfoComponent} from './components/track-info/track-info.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import { SearchComponent } from './components/search/search.component';
import { VideoComponent } from './components/video/video.component';
import { MusicComponent } from './components/music/music.component';
import { ImagesComponent } from './components/images/images.component';
import { ListComponent } from './components/list/list.component';
import { GridComponent } from './components/grid/grid.component';
import { MenuComponent } from './components/menu/menu.component';
import { ControlsBarComponent } from './components/controls-bar/controls-bar.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    TopBarComponent,
    ActionBarComponent,
    SidebarComponent,
    AudioPlayerComponent,
    ControlsComponent,
    VolumeComponent,
    TimelineComponent,
    TrackInfoComponent,
    VideoPlayerComponent,
    SearchComponent,
    VideoComponent,
    MusicComponent,
    ImagesComponent,
    ListComponent,
    GridComponent,
    MenuComponent,
    ControlsBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
