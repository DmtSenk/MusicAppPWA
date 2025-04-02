import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpMusic: HttpClient) { }

  getPlayList(): Observable<any>{
    return this.httpMusic.get('https://api.deezer.com/search?q=focus&type=track');
  }
}
