import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  chattingRef: any;
  userid : string;
  you: string;
  constructor(
    public fs: AngularFirestore,
    public atrCtrl: AlertController,
    public stor: Storage,
    public router: Router
    ) {
      this.stor.get('id').then((val) => { this.userid = val; });
      this.chattingRef = this.fs.collection('chatting', ref => ref.orderBy('Timestamp')).valueChanges();
  }
  ionViewWillEnter() {
    this.stor.get('id').then((val) => {this.userid = val;});
  }
  openChat(you: string) {
    this.you = you;
    this.router.navigate(['chat-room', this.you]);
  }
}