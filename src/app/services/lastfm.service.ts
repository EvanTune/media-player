import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {

  API_KEY = '1f17b0c26c23e60aa3beec4c51e7e048';

  constructor(
    private http: HttpClient
  ) { }


  getAlbumInfo() {
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=' + this.API_KEY + '&format=json');
  }

}
