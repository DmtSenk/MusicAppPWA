import { Component, OnInit} from '@angular/core';
import { IonMenuButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonLabel, IonSearchbar, IonItem, IonList } from '@ionic/angular/standalone';
import { MusicService } from '../Services/music.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Browser } from '@capacitor/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonMenuButton, IonMenu, RouterLink, IonList, IonItem, IonLabel, IonIcon, IonButton, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar, FormsModule ],
})
export class HomePage implements OnInit{

  constructor(private musicService:MusicService, private storage:Storage) {}

  Mood:string = "";
  NumOfSongs:number = 5; 
  Music:any[] = [];
  isPlaying:boolean = false;
  songUrl:string = "";
  audio:HTMLAudioElement = new Audio();
  likedSongs:any[] = [];
  searchSong: string = "";
  searchResults:any[] = [];


  async ionViewWillEnter(){
    await this.storage.create();
    this.Mood = await this.storage.get('Mood');
    this.NumOfSongs = await this.storage.get('NumOfSongs');
    this.likedSongs = await this.storage.get("LikedSongs");
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
  
  likeSong(song: any){
    let found = false;
    for(let i = 0; i < this.likedSongs.length; i++){
      if(this.likedSongs[i].id == song.id){
      this.likedSongs.splice(i,1);
      found = true;
      break;
      }
    }
    if(!found){
      this.likedSongs.push(song);
    }
    this.storage.set("LikedSongs",this.likedSongs);
  }

  isLiked(song: any):boolean{
    for(let i = 0; i<this.likedSongs.length;i++){
      if(this.likedSongs[i].id == song.id){
        return true;
      }
    }
    return false;
  }

  async searchMusic(){
    this.NumOfSongs = await this.storage.get('NumOfSongs');
    this.musicService.searchSong(this.searchSong, this.NumOfSongs).subscribe((data)=>{
      this.searchResults = data.data;
    });
  }

  ngOnInit():void{
    
  }
  
}
