import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

let _this;
@Component({
  selector: 'app-find',
  templateUrl: './find.page.html',
  styleUrls: ['./find.page.scss'],
})
export class FindPage implements OnInit {

  email:string='';
  name:string='';
  
  constructor(
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase

  ) {_this=this;}

  ngOnInit() {
  }
  findemail(){
    let info;
    try{
    firebase.database().ref().child('userinfo').orderByChild('name').equalTo(`${this.name}`).once('value', function(data){
      info=data.val();
      console.log(info);
      if(info == null){
        return _this.alertCtrl.create({
          header: '',
          message: `등록되지 않은 이름입니다`,
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
      try{var mail = info[Object.keys(info)[0]].email;}
      catch(err){
        console.log(err);
      }
      return _this.alertCtrl.create({
        header: '',
        message: `${_this.name} 님의 이메일은 ${mail}입니다`,
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    });}
    catch(err) {
      console.log(err);
    }
  } 
  resetpw(){
    let info;
    try{
      firebase.database().ref().child('userinfo').orderByChild('email').equalTo(`${this.email}`).once('value', function(data){
        info=data.val();
        console.log(info);
        if(info == null){
          return _this.alertCtrl.create({
            header: '',
            message: `등록되지 않은 이메일입니다`,
            buttons: [{
              text: '확인',
              role: 'cancel'
            }]
          }).then(alertEl => {
            alertEl.present();
          });
        }
        var pw = info[Object.keys(info)[0]].password;
        var name = info[Object.keys(info)[0]].name;
        var subpw = pw.substr(0,3);
        var ppw = "*".repeat(pw.length);

        console.log(subpw+ppw.substr(3));
        return _this.alertCtrl.create({
          header: '',
          message: `${name} 님의 비밀번호는 ${subpw+ppw.substr(3)}입니다`,
          buttons: [{
            text: '확인',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      });}
      catch(err) {
        console.log(err);
    }}
    
    sendMail(){
    console.log('1차');
    this.fAuth.auth.sendPasswordResetEmail(this.email)
        .then((result)=>{
          console.log(result);
          return this.alertCtrl.create({
            header: '',
            message: `${this.email}로 이메일 전송 성공..!`,
            buttons: [{
              text: '닫기',
              role: 'cancel'
            }]
          }).then(alertEl => {
            alertEl.present();
          });
        }
         
        )
        .catch( (error)=>{
          var message = error.message;
          if(message=='The email address is badly formatted.'){
            return this.alertCtrl.create({
              header: '',
              message: '잘못된 이메일 형식입니다',
              buttons: [{
                text: '확인',
                role: 'cancel'
              }]
            }).then(alertEl => {
              alertEl.present();
            });
          }
          if(message=='There is no user record corresponding to this identifier. The user may have been deleted.'){
            return this.alertCtrl.create({
              header: '',
              message: '존재하지 않는 이메일입니다',
              buttons: [{
                text: '확인',
                role: 'cancel'
              }]
            }).then(alertEl => {
              alertEl.present();
            });
          }
        });
      
  }
  
}
