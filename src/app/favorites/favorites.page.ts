import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonButton, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {

  constructor(private storage: Storage) { }

  likedSongs: any[] = [];
  isPlaying:boolean = false;
  songUrl:string = "";
  audio: HTMLAudioElement = new Audio();

  async ngOnInit() {
    await this.storage.create();
    this.likedSongs = await this.storage.get("LikedSongs");
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

}
