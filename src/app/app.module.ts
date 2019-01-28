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
import { NgScrollbarModule } from 'ngx-scrollbar';
import {AppRoutingModule} from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
import { SearchComponent } from './components/search/search.component';
import { MusicComponent } from './components/music/music.component';
import { MenuComponent } from './components/menu/menu.component';
import { ControlsBarComponent } from './components/controls-bar/controls-bar.component';
import { SongsComponent } from './components/songs/songs.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { EtTableComponent } from './components/et-table/et-table.component';
import { AlbumComponent } from './components/album/album.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MainComponent } from './components/main/main.component';
import { GeneralComponent } from './components/settings/general/general.component';
import { MusicFoldersComponent } from './components/settings/music-folders/music-folders.component';
import { VideoFoldersComponent } from './components/settings/video-folders/video-folders.component';
import { ColorThemeComponent } from './components/settings/color-theme/color-theme.component';
import { ProgressComponent } from './components/progress/progress.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PlaylistModalComponent } from './components/playlist-modal/playlist-modal.component';

import { MomentModule } from 'ngx-moment';
import { EmptyComponent } from './components/empty/empty.component';

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
    SearchComponent,
    MusicComponent,
    MenuComponent,
    ControlsBarComponent,
    SongsComponent,
    AlbumsComponent,
    ArtistsComponent,
    PlaylistComponent,
    NowPlayingComponent,
    EtTableComponent,
    AlbumComponent,
    ArtistComponent,
    SettingsComponent,
    MainComponent,
    GeneralComponent,
    MusicFoldersComponent,
    VideoFoldersComponent,
    ColorThemeComponent,
    ProgressComponent,
    FavouritesComponent,
    DropdownComponent,
    PlaylistModalComponent,
    EmptyComponent,
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
    NgScrollbarModule,
    MomentModule,
    NgxDatatableModule,
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
