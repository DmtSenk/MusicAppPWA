import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonSearchbar, IonItem } from '@ionic/angular/standalone';
import { MusicService } from '../Services/music.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItem, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonButton, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar ],
})
export class HomePage implements OnInit{
  constructor(private musicService:MusicService) {}

  Music:any[]=[];

  ngOnInit():void{
    this.musicService.getPlayList().subscribe((data)=>{
      this.Music = data.results;
    });
  }
  
}
