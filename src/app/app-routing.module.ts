import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MusicComponent} from './components/music/music.component';
import {VideoComponent} from './components/video/video.component';
import {ImagesComponent} from './components/images/images.component';

const routes: Routes = [
    {path: '', component: MusicComponent},
    {path: 'videos', component: VideoComponent},
    {path: 'images', component: ImagesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
