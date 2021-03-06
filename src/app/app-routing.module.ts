import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MusicComponent} from './components/music/music.component';
import {SongsComponent} from './components/songs/songs.component';
import {AlbumsComponent} from './components/albums/albums.component';
import {ArtistsComponent} from './components/artists/artists.component';
import {AlbumComponent} from './components/album/album.component';
import {ArtistComponent} from './components/artist/artist.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ColorThemeComponent} from './components/settings/color-theme/color-theme.component';
import {VideoFoldersComponent} from './components/settings/video-folders/video-folders.component';
import {MusicFoldersComponent} from './components/settings/music-folders/music-folders.component';
import {GeneralComponent} from './components/settings/general/general.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {FavouritesComponent} from './components/favourites/favourites.component';

const routes: Routes = [
  {path: '', redirectTo: 'music', pathMatch: 'full' },
  {path: 'music', component: MusicComponent, children: [
      {path: '', redirectTo: 'songs', pathMatch: 'full'},
      {path: 'songs', component: SongsComponent},
      {path: 'albums', component: AlbumsComponent},
      {path: 'artists', component: ArtistsComponent},
      {path: 'album/:albumName/artist/:artistName', component: AlbumComponent},
      {path: 'artist/:artistName', component: ArtistComponent}
    ]},
  {path: 'favourites', component: FavouritesComponent},
  {path: 'playlist/:playlistId', component: PlaylistComponent},
  {path: 'settings', component: SettingsComponent, children: [
      {path: '', redirectTo: 'general', pathMatch: 'full'},
      {path: 'general', component: GeneralComponent},
      {path: 'music-folders', component: MusicFoldersComponent},
      {path: 'video-folders', component: VideoFoldersComponent},
      {path: 'color-theme', component: ColorThemeComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
