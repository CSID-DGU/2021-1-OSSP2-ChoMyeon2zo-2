import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
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
  public school:string; 
  schooltype:string; 
  public userid: string;
  constructor(
    public stor:Storage,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public db:AngularFireDatabase
  ) {
    this.stor.get('id').then((val)=>{
      this.userid=val;
    });
  }
  ngOnInit(){
    
    if(this.userid===null)
    {
    this.school="동국대학교";
    this.schooltype="판매동국대학교";
    this.loadList();
    }
    else
    {
      console.log(this.userid);
      firebase.database().ref().once('value').then((snapshot) => {
        this.school= snapshot.child(`userinfo/${this.userid}/school`).val();  //학교
        console.log(this.school);
        this.schooltype="판매"+this.school;
        console.log(this.schooltype);
        this.loadList();
         });
        
    }
  }
  loadList(){
    
    this.db.list('board/',ref=>ref.orderByChild('type_school').equalTo(this.schooltype)).valueChanges().subscribe(data=>{this.items=data;})
}
getPost(item: any) {
  this.postkey = item.postkey;
  this.writer = item.userid;
  this.router.navigate(['post', this.postkey, this.writer]);
}
goCreatePost() {
  this.router.navigate(['board']);
}
goCategory() {
  this.router.navigate(['category']);
}
schoolChanged(event){
  this.school=event.detail.value;
  this.schooltype="판매"+this.school;
  this.loadList();
}

}
