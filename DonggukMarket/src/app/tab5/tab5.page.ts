import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  constructor(
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public fAuth: AngularFireAuth,
    private router:Router
  ) {}

  logout(){
    this.fAuth.auth.signOut().then((result)=>{
      console.log(result);
      return this.alertCtrl.create({
        header: '',
        message: '로그아웃에 성공하였습니다.',
        buttons: [{
          text: '닫기',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
     
    })
  }
}
