import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public searchinput: string="";
  public postkey: string;
  public writer: string;
  public items=[];
  public writerInfo=[];

  constructor(
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public db:AngularFireDatabase
  ) {}
  ngOnInit(){
    this.loadList();
  }
  loadList(){
    this.db.list('board/',ref=>ref.orderByChild('type').equalTo("판매")).valueChanges().subscribe(data=>{this.items=data;})
}
getPost(item: any) {
  this.postkey = item.postkey;
  this.writer = item.userid;
  this.router.navigate(['post', this.postkey, this.writer]);
}
goCreatePost() {
  this.router.navigate(['board']);
}

}
