import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { FIREBASE_CONFIG } from './environment'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
  	this.initializeApp();
  }
  
  initializeApp() {
    //firebase.initializeApp(FIREBASE_CONFIG)
    //firebase.initializeApp(firebase) 
  }
}
