import { Component, OnInit } from '@angular/core';
//import {NavController, AlertController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Router , ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
//import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './catepost.page.html',
  styleUrls: ['./catepost.page.scss'],
})
export class CatepostPage implements OnInit {

  public cate: string; 
  headert: string;
  public items=[];
  public postkey: string;
  public writer: string;
  constructor(   public router: Router,
    public navCtrl: NavController,
    public plat:Platform,
    public activatedRoute:ActivatedRoute,
    public db:AngularFireDatabase,
    public stor:Storage,
    public alertCtrl: AlertController,
    public fs: AngularFirestoreModule) { }

  ngOnInit() {
    this.cate = this.activatedRoute.snapshot.paramMap.get('cate');
    this.headert=this.cate;
    if(this.cate==="살게요")
    {
      this.loadList2();
    }
    else{
    this.loadList();
    }
  }
  loadList(){
    this.db.list('board/',ref=>ref.orderByChild('category').equalTo(this.cate)).valueChanges().subscribe(data=>{this.items=data;})
}
loadList2(){
  this.db.list('board/',ref=>ref.orderByChild('type').equalTo(this.cate)).valueChanges().subscribe(data=>{this.items=data;})
}



getPost(item: any) {
  this.postkey = item.postkey;
  this.writer = item.userid;
  this.router.navigate(['post', this.postkey, this.writer]);
}
 

}
