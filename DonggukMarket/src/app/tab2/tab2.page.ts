import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {Storage} from '@ionic/storage'
import { R3UsedDirectiveMetadata } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public searchinput: string="";
  public postkey: string;
  public writer: string;
  public items=[];
  public writerInfo=[];
  segment:string;
  public school:string; 
  schooltype:string; 
 
  public userid : string;


    constructor(
      public router: Router,
      public navCtrl: NavController,
      public plat:Platform,
      public activatedRoute:ActivatedRoute,
      public db:AngularFireDatabase,

      public alertCtrl: AlertController,
      public fs: AngularFirestoreModule,
      public stor : Storage,
      public ac:ActivatedRoute,
    ) {
      this.stor.get('id').then((val)=>{ this.userid=val;});
    }
    ngOnInit(){
      if(this.userid===null)
      {
      this.segment='대여';
      this.school="동국대학교";
      this.schooltype="대여동국대학교";
      this.loadList();
      }
      else
    {
      
      console.log(this.userid);
      firebase.database().ref().once('value').then((snapshot) => {
        this.school= snapshot.child(`userinfo/${this.userid}/school`).val();  //학교
        console.log(this.school);
        this.schooltype='대여'+this.school;
        console.log(this.schooltype);
        this.loadList();
         });
        
    }
    }
    segmentChanged(event){
      this.segment=event.detail.value;
      this.schooltype=this.segment+this.school;
      this.loadList();
    }
    loadList(){
      this.db.list('board/',ref=>ref.orderByChild('type_school').equalTo(this.schooltype)).valueChanges().subscribe(data=>{this.items=data;})
    }
    goCreatePost() {
      this.router.navigate(['board']);
    }
    goCategory() {
      this.router.navigate(['category']);
    }
    getPost(item: any) {
      this.postkey = item.postkey;
      this.writer = item.userid;
      this.router.navigate(['post', this.postkey, this.writer]);
    }
    schoolChanged(event){
      this.school=event.detail.value;
      this.schooltype=this.segment+this.school;
      this.loadList();
    }

  }
