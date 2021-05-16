import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';

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
  phone_check:boolean=false;//전화번호 인증
  student_credit:boolean=false;//재학생인증
  trade_credit:number=0;//신뢰도
  domain:string='';
  email:string='';//이메일주소
  school:string='';


  smsphone:string='';
  recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  
  constructor(
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  createEmail(){
    this.email=this.id+'@'+this.domain;
  }

  createSMSphone(){
    this.smsphone='+82'+this.phone;
  }

  sendPhone(){
    var applicationVerifier = this.recaptchaVerifier;
    this.createSMSphone();
    console.log(this.smsphone+'새로운 번호');
    var i = 0;
    this.fAuth.auth.signInWithPhoneNumber(this.smsphone, applicationVerifier)
    .then( async (confirmationResult) => {

      console.log(confirmationResult);
      let prompt = await this.alertCtrl.create({
      inputs: [{ name: 'Code', placeholder: '인증 번호를 입력하세요' }],
      buttons: [
        { text: '취소'
        },
        { text: '확인',
          handler: data => {
            confirmationResult.confirm(data.Code)
            .then(function (result) {
              console.log(result.user);
              var user = firebase.auth().currentUser;
              console.log('user = '+user);
              console.log('i = '+i);
              user.delete().then(function() {
                console.log('success');
              },
              
              function(error) {
              i++;
              console.log(error+'in delete user');
              });

            }).catch(function (error) {
              i++;
              console.log(error);
            });
          }
        }
      ]
    });
    console.log('last i = '+i);
    if(i==0) this.phone_check=true;
    await prompt.present();
  })
  .catch(function (error) {
    console.error("SMS not sent by ", error);
  });
  }

  async register() {
    this.createEmail();
    if(this.email === '' || this.phone_check==false || this.domain===' ' || this.password === '' || this.name === '' || this.major === ''){
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
    this.db.object(`userinfo/${strArray}/school`).set(this.school);
    this.db.object(`userinfo/${strArray}/phone_check`).set(this.phone_check);
    
    this.fAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((result)=>{
      console.log(result);
      this.navCtrl.navigateForward('/student-check');
    })
    .catch( (error)=>{
      var errorMessage=error.message;
      console.log(errorMessage);
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
