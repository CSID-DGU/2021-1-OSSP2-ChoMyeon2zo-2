import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { validateEventsArray } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

let _this;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage {
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
    public navCtrl: NavController, 
    // private alertCtrl: AlertController,
    public fAuth: AngularFireAuth,
    public stor: Storage,
    public router: Router,
    private route: ActivatedRoute
  ) {_this=this; var a;}

  ngOnInit(){
    this.stor.get('id').then((val) => {
      console.log('val = '+val);
      this.userid = val;
      console.log("my-profile test : "+this.userid);
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
        // _this.group=user['trade_list']['group'];

        // console.log("tt"+_this.group[1]);

        _this.trade_credit *= 1;
        _this.trade_count = Object.keys(_this.trade_list).length;
        console.log("trade length : "+_this.trade_count);

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

  set(){
    this.name=_this.name;
    this.email=_this.email;
    this.major=_this.major;
    console.log('credit = '+_this.credit);
    if(_this.credit==false){
      this.check="재학생 미인증";
    }
    else {
      this.check="재학생 인증";
    }
    console.log('set name='+_this.name+' '+this.name);

  }
  ionViewDidLeave(){
    console.log('leave');

  }
}
