import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { validateEventsArray } from '@angular/fire/firestore';

let _this;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public postkey: string;
  public writer: string;
  public items=[];
  public times=[];
  public writerInfo=[];
  segment:string;

  public userid:string="";
    public name:string="";
    public email:string="";
    public major:string="";
    public credit:string="";
    public num:number=0;
    public check:string="";
    public school:string="";
    public nickname:string="";
    public phone:number=0;
    public trade_credit:number=0;
    public trade_list:number=0;

  constructor(
  public router: Router,
  public navCtrl: NavController,
  public plat:Platform,
  public activatedRoute:ActivatedRoute,
  public db:AngularFireDatabase,
  public stor: Storage,

  public alertCtrl: AlertController,
  public fs: AngularFirestoreModule,
  ) {_this=this; var a;}
  ngOnInit(){
        this.loadList();
        this.stor.get('id').then((val) => {
              console.log('val = '+val);
              this.userid = val;
              firebase.database().ref().child(`userinfo/${this.userid}`).on('value', function(data){
                var user = data.val();
                _this.name=user['name'];
                _this.email=user['email'];
                _this.major=user['major'];
                _this.credit=user['student_credit'];
                _this.nickname=user['nickname'];
                _this.school=user['school'];
                _this.trade_credit=user['trade_credit'];
                _this.phone=user['phone'];
                _this.trade_list=user['trade_list'];

                _this.trade_credit *= 1;
                _this.trade_count = Object.keys(_this.trade_list).length;

                if(_this.trade_count !== 0){
                  _this.trage_credit_score = _this.trade_credit/_this.trade_count
                }
                else{
                  _this.trage_credit_score = 0
                }
                _this.set();
               })
             });
      }

  loadList(){
      this.db.list('board/',ref=>ref.orderByChild('postkey')).valueChanges().subscribe(data=>{this.items=data;})

  }
  getPost(item: any) {
       this.postkey = item.postkey;
       this.writer = item.userid;
       this.router.navigate(['post', this.postkey, this.writer]);
     }
}
