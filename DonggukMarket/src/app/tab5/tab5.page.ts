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
  public time:string="";
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
        _this.time=user['student_credit_date'];
       });
     });
      console.log(_this.time);
      var olddate = new Date(_this.time.substr(0,4)+'/'+_this.time.substr(4,2)+'/'+_this.time.substr(6,2));
      var now = new Date();
      var year = String(now.getFullYear());
      var month = String(now.getMonth()+1);
      if(month.length==1) month='0'+month;
      var date =String( now.getDate());
      if(date.length==1) date = '0'+date;
      var nowDate = new Date(year+'/'+month+'/'+date);
      console.log(olddate+' '+nowDate);
      if(olddate.setDate(olddate.getMonth()+6) < nowDate.getTime() ){
        return this.alertCtrl.create({
          header: '',
          message: '재학생 인증을 한지<br>6개월이 되었습니다',
          buttons: [{
            text: '닫기'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }

      _this.set();
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
