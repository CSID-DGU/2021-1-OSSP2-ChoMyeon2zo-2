import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, NavigationExtras } from '@angular/router';

import * as firebase from 'firebase/app';
let _this;
@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})

export class SignPage implements OnInit {

  id:string='';
  password:string='';
  nickname:string='';
  name:string='';
  major:string='';
  phone:string="";//전화번호
  phone_check:boolean=false;//전화번호 인증
  student_credit:boolean=false;//재학생인증
  trade_credit:number=0;//신뢰도
  domain:string='';
  email:string='';//이메일주소
  school:string='';

  pressed:boolean=false;
  nicknamepressed:boolean=false;
  idpressed:boolean=false;
  id_check:boolean=true;
  nickname_check:boolean=true;
  smsphone:string='';
  recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  
  constructor(
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    private router:Router
  ) {_this=this; _this.phone_check=false;}

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  async createEmail(){
    this.email=this.id+'@'+this.domain;
  }

  async createSMSphone(){
    this.smsphone='+82'+this.phone;
  }

  async changeStatus(){
    if(_this.phone_check==true){
      this.phone_check=true;
    }
    else this.phone_check=false;

    console.log(_this.phone_check+'   '+this.phone_check);
  }

  async changecheckStatus(){
    this.id_check=_this.id_check;
    this.nickname_check=_this.nickname_check;
  }

  pressChange(){
      this.pressed=true;
  }
  nicknamepress(){
    this.nicknamepressed=true;
  }
  idpress(){
    this.idpressed=true;
  }
  async sendPhone(){
    
    this.pressChange();
    console.log(_this.phone_check+'   '+this.phone_check);
    var applicationVerifier = this.recaptchaVerifier;
    this.createSMSphone();
    console.log(this.smsphone+'새로운 번호');
    const res = this.fAuth.auth.signInWithPhoneNumber(this.smsphone, applicationVerifier)
    .then( async (confirmationResult) => {
      console.log('confirm ' + confirmationResult);
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
              console.log(_this.phone_check+'   ');
              var user = firebase.auth().currentUser;
              console.log('user = '+user);
              _this.phone_check=true;
              user.delete().then(function() {
                console.log('Delete success');
                return _this.alertCtrl.create({
                  header: '',
                  message: '인증에 성공했습니다',
                  buttons: [{
                    text: '확인',
                    role: 'cancel'
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });
              },
            
              function(error) {
                console.log(_this.phone_check);
              console.log(error+'in delete user');
              _this.phone_check=false;
              });

            })
            .catch(function (error) {
              console.log(error.message);
              _this.phone_check=false;
              return _this.alertCtrl.create({
                header: '',
                message: '인증번호가 틀렸습니다! 다시 인증을 받으세요',
                buttons: [{
                  text: '확인',
                  role: 'cancel'
                }]
              }).then(alertEl => {
                alertEl.present();
              });
            });
          }
        }
      ]
    });
    await prompt.present();
    console.log(_this.phone_check+'   '+this.phone_check);
  })
  .catch(function (error) {
    console.error("SMS not sent by ", error);
    console.log(_this.phone_check+'   '+this.phone_check);
  })
  }

  id_checkfunc(){
    //아이디
    this. idpress();

    let info;
    try{
      firebase.database().ref().child(`userinfo/${this.id}`).once('value', function(data){
      info=data.val();
      console.log(info);
      if(info != null){
        _this.id_check=false;
        console.log('아이디 이미 존재');
        return _this.alertCtrl.create({
          header: '',
          message: '아이디가 사용중입니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
      else{
        _this.id_check=true;
        console.log('아이디 사용가능');
        return _this.alertCtrl.create({
          header: '',
          message: '아이디를 사용하실 수 있습니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    });}
    catch(err) {
      console.log(err);
    }
    console.log('id '+_this.id_check);
  }

  nickname_checkfunc(){
    //닉네임
    this.nicknamepress();
    let info;
    try{
      firebase.database().ref().child('userinfo').orderByChild('nickname').equalTo(`${this.nickname}`).once('value', function(data){
      info=data.val();
      console.log(info);
      if(info != null){
        _this.nickname_check=false;
        console.log('닉네임 이미 존재');
        return _this.alertCtrl.create({
          header: '',
          message: '닉네임이 사용중입니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
      else{
        _this.nickname_check=true;
        console.log('닉네임 사용가능');
        return _this.alertCtrl.create({
          header: '',
          message: '닉네임을 사용하실 수 있습니다',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    });}
    catch(err) {
      console.log(err);
    }
    console.log('nickname '+_this.nickname_check);
  }


  /*nickname_checkfunc(){
    let dv;
    console.log('nickname = '+this.nickname+' id = '+this.id);
    try{
      firebase.database().ref().child('userinfo').orderByChild('nickname').equalTo(`${this.nickname}`).once('value', function(data){
       dv=data.val();
        console.log('nickname info = '+dv);
        if(dv == null){
          _this.nickname_check=true;
        }
        
      });
    }
    catch(err) {
      console.log(err);
    }
  }*/

  register() {
    this.changeStatus();
    this.createEmail();

    this.changecheckStatus();
    //중복 제거
    //닉네임
    
    console.log('check = '+this.id_check +' nickname = '+this.nickname_check);
    if(this.id_check==false){
      return this.alertCtrl.create({
        header: '',
        message: '아이디가 사용중입니다',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    if(this.nickname_check==false){
      return this.alertCtrl.create({
        header: '',
        message: '닉네임이 사용중입니다',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });

    }
    if(this.nicknamepressed==false){
      return this.alertCtrl.create({
        header: '',
        message: '닉네임을 인증받아야합니다',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    console.log('press = '+this.pressed);
    if(this.email === '' || this.school===''|| this.domain===''||this.phone==='' || this.password === '' || this.name === '' || this.major === '' || this.nickname===' ' ){
      return this.alertCtrl.create({
        header: '',
        message: '빈칸을 모두 채워주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    if(this.pressed == false ||this.phone_check==false){
      return this.alertCtrl.create({
        header: '',
        message: '휴대폰이 인증되지 않았습니다',
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
    this.db.object(`userinfo/${strArray}/nickname`).set(this.nickname);
    this.db.object(`userinfo/${strArray}/major`).set(this.major);
    this.db.object(`userinfo/${strArray}/phone`).set(this.phone);
    this.db.object(`userinfo/${strArray}/student_credit`).set(this.student_credit);
    this.db.object(`userinfo/${strArray}/email`).set(this.email);
    this.db.object(`userinfo/${strArray}/school`).set(this.school);
    this.db.object(`userinfo/${strArray}/phone_check`).set(this.phone_check);
    
  
    this.db.object(`userinfo/${strArray}/trade_credit`).set(this.trade_credit); //신뢰도
    this.db.object(`userinfo/${strArray}/trade_list/0`).set(0);//거래한 사람
    this.db.object(`userinfo/${strArray}/like_list/0`).set(0);//관심 목록

    //parameter to student_check(id)
    let info: NavigationExtras = {
      state: {
        id:this.id,
        email:this.email
      } 
    };

    this.fAuth.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then((result)=>{
      console.log(result);
      return this.alertCtrl.create({
        header: '',
        message: '회원가입 다음페이지로 이동합니다.',
        buttons: [{
          text: '확인',
          handler: () => {
            this.router.navigate(['/student-check'],info);
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
     
    })
    .catch((error)=>{
      var errorMessage=error.message;
      console.log(errorMessage);
      if(errorMessage=='The email address is badly formatted.'){
        return this.alertCtrl.create({
          header: '',
          message: '이메일 형식이 잘못되었습니다.',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
      if(errorMessage=='Password should be at least 6 characters'){
        return this.alertCtrl.create({
          header: '',
          message: '비밀번호가 짧습니다.',
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }

      if(errorMessage=='The email address is already in use by another account.'){
        return this.alertCtrl.create({
          header: '',
          message: '이미 존재하는 이메일입니다',
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
