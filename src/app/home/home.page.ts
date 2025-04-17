import { Component, OnInit} from '@angular/core';
import { IonMenuButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonLabel, IonSearchbar, IonItem, IonList } from '@ionic/angular/standalone';
import { MusicService } from '../Services/music.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonMenuButton, IonMenu, RouterLink, IonList, IonItem, IonLabel, IonIcon, IonButton, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar ],
})
export class HomePage implements OnInit{
  constructor(private musicService:MusicService, private storage:Storage) {}
  Mood:string = "";
  NumOfSongs:number = 5; 
  Music:any[]=[];
  isPlaying:boolean = false;
  songUrl:string = "";
  audio: HTMLAudioElement = new Audio();

  async ionViewWillEnter(){
    await this.storage.create();
    this.Mood = await this.storage.get('Mood');
    this.NumOfSongs = await this.storage.get('NumOfSongs');
    if(this.Mood){
      this.musicService.getMoodSongs(this.Mood, this.NumOfSongs).subscribe((data)=>{
        this.Music = data.data;
      });

    }
  }

  playMusic(url: string){
    if(this.isPlaying && this.songUrl == url ){
      this.audio.pause();
      this.isPlaying = false;
    }else{
      if(this.songUrl != url){
        this.songUrl = url;
        this.audio.src = url;
        this.audio.play();
      }else{
        this.audio.play();
      }
      this.isPlaying = true;
    }
  }

  async openDownload(){
    await Browser.open({ url: "https://www.jamendo.com/start"});
  }
  
  ngOnInit():void{
    
  }
  
}
