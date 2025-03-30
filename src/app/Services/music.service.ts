import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpMusic: HttpClient) { }

  getPlayList(): Observable<any>{
    return this.httpMusic.get('https://api.jamendo.com/v3.0/tracks?client_id=c8e47783&limit=5');
  }
}
