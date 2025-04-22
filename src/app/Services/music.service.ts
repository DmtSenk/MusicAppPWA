import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpMusic: HttpClient) { } 

  getMoodSongs(Mood: string, NumOfSongs: number):Observable<any>{
    // to get access to that api
    //https://cors-anywhere.herokuapp.com/corsdemo
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(Mood)}&limit=${NumOfSongs}`;
    return this.httpMusic.get(url);
  }

  searchSong(search: string, NumOfSongs: number):Observable<any>{
    const url =`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(search)}&limit=${NumOfSongs}`;
    return this.httpMusic.get(url);
  }
}
