import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RadioService } from '../Services/radio.service';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RadioPage implements OnInit {

  constructor(private radioService:RadioService, private storage:Storage) { }

  Country:string = "";
  page:number = 0;
  maxStations:number = 8;
  allStations:any[] = [];
  currentStations:any[] = [];
  audio:HTMLAudioElement = new Audio();
  isPlaying:boolean = false;
  stationUrl:string = "";
  
  async ionViewWillEnter(){
    await this.storage.create();
    this.page = 0;
    this.Country = await this.storage.get("RadioCountry");
    this.radioService.getStations(this.Country).subscribe((data)=>{
      this.allStations = data;
      this.showCurrStaions();
    });
  }

  showCurrStaions(){
    const indexStart = this.page * this.maxStations;
    const indexEnd = indexStart + this.maxStations;
    this.currentStations = this.allStations.slice(indexStart,indexEnd);
  }

  nextPage(){
    if((this.page + 1) * this.maxStations < this.allStations.length){
      this.page++;
      this.showCurrStaions();
    }
  }

  prevPage(){
    if(this.page > 0){
      this.page--;
      this.showCurrStaions();
    }
  }

  playMusic(url: string){
    if(this.isPlaying && this.stationUrl == url ){
      this.audio.pause();
      this.isPlaying = false;
    }else{
      if(this.stationUrl != url){
        this.stationUrl = url;
        this.audio.src = url;
        this.audio.play();
      }else{
        this.audio.play();
      }
      this.isPlaying = true;
    }
  }

  ngOnInit() {
    
  }

}
