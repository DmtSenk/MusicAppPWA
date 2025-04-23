import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private httpRadio: HttpClient) { }

  getStations(country: string):Observable<any>{
   const url = `https://fi1.api.radio-browser.info/json/stations/search?limit=60&countrycode=${encodeURIComponent(country)}&hidebroken=true&order=clickcount&reverse=true`;
   return this.httpRadio.get(url);
  }
}
