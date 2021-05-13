import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

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
  ) { }

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
      if(this.user.email.indexOf("@dgu.ac.kr")<0) {
        const alert = await this.alertController.create({
          message: '이메일 형식이 틀렸습니다!',
          buttons: ['닫기']
        });
        this.clear();
        await alert.present();
      };
      if(this.user.email.indexOf("@dgu.ac.kr")>=0){
        
        this.presentAlert();
      }
      

    }catch (err) {
      const alert1 = await this.alertController.create({

        message: '로그인에 실패했습니다!',
        buttons: ['닫기']
      });
      this.clear();
      await alert1.present();
      console.error(err);
    }
  }

  async presentAlert() {
    const alert2 = await this.alertController.create({

      message: '환영합니다!',
      buttons: ['닫기']
    });
    
    await alert2.present();
    this.navCtrl.navigateRoot('');
  }
  ngOnInit() {
  }
}
