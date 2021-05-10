import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public code: string;
  public writer: string;
  public items=[];
  public writerInfo=[];
  segment:string;
    constructor( 
      public router: Router,
      public navCtrl: NavController,
      public plat:Platform,
     // public stor:Storage,
      public activatedRoute:ActivatedRoute,
      public db:AngularFireDatabase
    ) {
    }
    ngOnInit(){
      this.segment='대여';
      this.loadList();
    }
    segmentChanged(event){
      this.segment=event.detail.value;
      this.loadList();
    }
    loadList(){
        this.db.list('board/',ref=>ref.orderByChild('type').equalTo(this.segment)).valueChanges().subscribe(data=>{this.items=data;})
    }
    goCreatePost() {
      this.router.navigate(['board']);
    }
    getPost(item: any) {
      this.code = item.code;
      this.writer = item.userid;
      this.router.navigate(['post', this.code, this.writer]);
    }
  }
