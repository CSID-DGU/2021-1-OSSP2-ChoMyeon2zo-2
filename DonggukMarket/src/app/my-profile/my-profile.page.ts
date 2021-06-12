import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
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
  public userpic:string="";
  public name:string="";
  public email:string="";
  public major:string="";
  public credit:string="";
  public num:number=0;
  public check:string="";
  public school:string="";
  public nickname:string="";
  public phone:number=0;
  public trade_count:number=0;
  public trade_credit:number=0;
  public group:number=0;
  public rent:number=0;
  public sell:number=0;
  public credit_str: string; 
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
        _this.userpic=user['userpic'];
        _this.name=user['name'];
        _this.email=user['email'];
        _this.major=user['major'];
        _this.credit=user['student_credit'];
        _this.nickname=user['nickname'];
        _this.school=user['school'];
        _this.trade_credit=user['trade_credit'];
        _this.phone=user['phone'];
        // _this.trade_list=user['trade_list'];
        _this.trade_count=user['trade_count'];
        _this.group=user['trade_list']['group'];
        _this.rent=user['trade_list']['rent'];
        _this.sell=user['trade_list']['sell'];

        // console.log("tt"+_this.group[1]);

        _this.trade_credit *= 1;
        _this.group = Object.keys(_this.group).length;
        _this.rent = Object.keys(_this.rent).length;
        _this.sell = Object.keys(_this.sell).length;

        console.log("trade length : "+(_this.group+_this.rent+_this.sell-3));
        console.log("trade count : "+(_this.trade_count));

        if((_this.trade_count) !== 0){
          _this.trage_credit_score = _this.trade_credit/_this.trade_count;
          if(_this.trage_credit_score<5 && _this.trage_credit_score>=4)
          {
               _this.credit_str="매우좋음";
          }
          else if(_this.trage_credit_score<4 && _this.trage_credit_score>=3)
          {
               _this.credit_str="좋음";
          }
          else if(_this.trage_credit_score<3 && _this.trage_credit_score>=2)
          {
               _this.credit_str="보통";
          }
          else if(_this.trage_credit_score<2 && _this.trage_credit_score>=1)
          {
               _this.credit_str="나쁨";
          }
          else
          {
            _this.credit_str="매우 나쁨";
          }
        }
        else{
          _this.trage_credit_score = 0
        }
        _this.set();
       })
     });
  }

  set(){
    this.userpic=_this.userpic;
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

  movetorecheck(){
    
    var studentnum;
    try{
    firebase.database().ref().child(`userinfo/${this.userid}`).on('value', function(data){
      var user = data.val();
      studentnum=user['student_number'];
    });}
    catch(err) {console.log(err);}
    let info: NavigationExtras = {
      state: {
        id:this.userid,
        name:this.name,
        phone:this.phone,
        student_num:studentnum
      } 
    };
    this.router.navigate(['/student-recheck'],info);
  }
  ionViewDidLeave(){
    console.log('leave');

  }
}
