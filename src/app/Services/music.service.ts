import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpMusic: HttpClient) { } 

  getMoodSongs(Mood: string, NumOfSongs: number):Observable<any>{
    //https://cors-anywhere.herokuapp.com/corsdemo
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(Mood)}&limit=${NumOfSongs}`;
    return this.httpMusic.get(url);
  }
}
