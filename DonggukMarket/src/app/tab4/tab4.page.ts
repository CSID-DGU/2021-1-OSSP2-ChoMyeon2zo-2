import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  chattingRef: any;
  Email: string;
  you: string;
  constructor(
    public fs: AngularFirestore,
    public atrCtrl: AlertController
    ) {
      this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
  }
}
