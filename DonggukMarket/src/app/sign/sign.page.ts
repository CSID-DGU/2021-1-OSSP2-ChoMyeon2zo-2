import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  id:string='';
  password:string='';
  name:string='';
  major:string='';
  phone:string="";//전화번호
  student_credit:string="";//재학생인증
  trade_credit:string="";//신뢰도
  email:string='';//이메일주소 생성


  constructor(
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
  }
  async createEmail(){
    this.email=this.id+'@dgu.ac.kr';
  }
  async register() {
    this.createEmail();
    if(this.id === '' || this.password === '' || this.name === '' || this.major === ''){
      return this.alertCtrl.create({
        header: '',
        message: '다시 입력해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    let strArray = this.id;
    this.db.object(`userinfo/${strArray}/id`).set(this.id);
    this.db.object(`userinfo/${strArray}/password`).set(this.password);
    this.db.object(`userinfo/${strArray}/name`).set(this.name);
    this.db.object(`userinfo/${strArray}/major`).set(this.major);
    this.db.object(`userinfo/${strArray}/phone`).set(this.phone);
    this.db.object(`userinfo/${strArray}/student_credit`).set(this.student_credit);
    this.db.object(`userinfo/${strArray}/trade_credit`).set(this.trade_credit);
    this.db.object(`userinfo/${strArray}/email`).set(this.email);

    
    this.fAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((result)=>{
      console.log(result);
      this.navCtrl.navigateForward('/phone-check');
    })
    .catch( (error)=>{
      var errorMessage=error.message;
      if(errorMessage=='The email address is already in use by another account.'){
        return this.alertCtrl.create({
          header: '',
          message: '이미 존재하는 ID입니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    })
  }
}
