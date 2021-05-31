import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

let _this;
export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:User = new User();
  constructor(
    public navCtrl: NavController, 
    public afAuth: AngularFireAuth,
    public alertController: AlertController,
    public db: AngularFireDatabase,
    public stor: Storage
  ) {_this=this;}

  priorPage(){
    this.navCtrl.navigateRoot('tabs/tab5');
  }
  async clear(){
    this.user.email = '';
    this.user.password = '';
  } 

  async login() {
    try {
      var r = await this.afAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      var id = this.user.email.split('@')[0];
      const studentcheck = (await firebase.database().ref().child(`userinfo/${id}`).once('value')).val();
      console.log(studentcheck.student_credit);
      console.log('id = '+id);
      if(studentcheck.student_credit==false) {
        const alert = await this.alertController.create({
          message: '학생증 인증이 완료되지 않아서 로그인이 불가합니다.',
          buttons: ['닫기']
        });
        this.clear();
        await alert.present();
      }
      else {
        this.stor.set('id',id);
        this.presentAlert();
      }
    }catch (err) {
      console.log(err.message);
      if(err.message == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.' ||
           err.message== 'The email address is badly formatted.'){
        const alert1 = await this.alertController.create({

          message: '이메일 형식이 아닙니다.',
          buttons: ['닫기']
        });
        this.clear();
        await alert1.present();
        console.error(err);
      }
      if(err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
        const alert1 = await this.alertController.create({

          message: '이메일이 존재하지 않습니다.',
          buttons: ['닫기']
        });
        this.clear();
        await alert1.present();
        console.error(err);
      }
      if(err.message == 'The password is invalid or the user does not have a password.'){
        const alert1 = await this.alertController.create({

          message: '패스워드가 틀렸습니다.',
          buttons: ['닫기']
        });
        this.clear();
        await alert1.present();
        console.error(err);
      }
      if(err.message == 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'){
        const alert1 = await this.alertController.create({

          message: '비밀번호를 너무 많이 틀려 계정이 잠시 잠겼습니다.',
          buttons: ['닫기']
        });
        this.clear();
        await alert1.present();
        console.error(err);
      }
    }
  }

  async presentAlert() {
    const alert2 = await this.alertController.create({

      message: '환영합니다!',
      buttons: ['닫기']
    });
    
    await alert2.present();
    this.clear();
    this.navCtrl.navigateRoot('tabs/tab3');
  }
  ngOnInit() {
  }
  
}
