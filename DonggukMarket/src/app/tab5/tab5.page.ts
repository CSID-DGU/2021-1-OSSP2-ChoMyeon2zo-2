import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

let _this;
@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  public userid:string="";
  public name:string="";
  public email:string="";
  public major:string="";
  public credit:string="";
  public num:number=0;
  public check:string="";
  public nickname:string="";
  public items=[];
  constructor(
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public fAuth: AngularFireAuth,
    public stor: Storage,
    public router: Router
  ) {_this=this; var a;}

  change(){
    this.stor.get('id').then((val) => {
      console.log('val = '+val);
      this.userid = val;
      firebase.database().ref().child(`userinfo/${this.userid}`).on('value', function(data){
        console.log(data.val());
        var user = data.val();
        _this.name=user['name'];
        _this.email=user['email'];
        _this.major=user['major'];
        _this.nickname=user['nickname'];
        _this.credit=user['student_credit'];
        _this.set();
       });
     });
  }

  set(){
    this.name=_this.name;
    this.email=_this.email;
    this.major=_this.major;
    this.nickname=_this.nickname;
    console.log('credit = '+_this.credit);
    if(_this.credit==false){
      this.check="재학생 미인증";
    }
    else {
      this.check="재학생 인증";
    }
    console.log('set name='+_this.name+' '+this.name);
  }
  click(){
    this.num++;
    this.ngOnInit();
  }
  logout(){
    this.fAuth.auth.signOut().then((result)=>{
      this.stor.set('id',null);
      return this.alertCtrl.create({
        header: '',
        message: '로그아웃에 성공하였습니다.',
        buttons: [{
          text: '닫기',
          handler: () => {
            this.stor.get('id').then((val) => {
              console.log('handler = '+val);
             });
            this.ngOnInit();
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    })
  }
  ngOnInit() {
    this.change();
  }
  ionViewWillEnter(){
    this.change();
  }
  ionViewDidLeave(){
    console.log('leave');

  }
  toSell() {
    this.router.navigateByUrl('/my-sell');
  }
  toBuy() {
    this.router.navigateByUrl('/my-buy');
  }
  toBorrow() {
    this.router.navigateByUrl('/my-borrow');
  }
  toLike() {
    this.router.navigateByUrl('/my-like');
  }
}
