import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelectOption, IonSelect, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonBackButton, IonButtons, IonSelectOption, IonSelect, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor(private storage:Storage, private router:Router) { }

  Mood:string = "";
  NumOfSongs:number = 5; 
  Country:string = "";

  async ionViewWillEnter(){
    await this.storage.create();
    this.Mood = await this.storage.get('Mood');
    this.NumOfSongs = await this.storage.get("NumOfSongs");
    this.Country = await this.storage.get("RadioCountry");
  }
  
  async onSaveClick(){
    await this.storage.create();
    await this.storage.set('Mood',this.Mood);
    await this.storage.set("NumOfSongs",this.NumOfSongs);
    await this.storage.set("RadioCountry", this.Country);
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }
}
