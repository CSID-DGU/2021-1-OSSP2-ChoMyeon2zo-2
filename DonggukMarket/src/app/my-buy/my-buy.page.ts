import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

let _this;
@Component({
  selector: 'app-my-buy',
  templateUrl: './my-buy.page.html',
  styleUrls: ['./my-buy.page.scss'],
})
export class MyBuyPage implements OnInit {
  public userid : string;
  public postkey: string;  
  public writer: string;
  public items=[];

  constructor(    public stor: Storage,
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertCtrl: AlertController  
  ) {_this=this;}

  ngOnInit() {
    this.stor.get('id').then((val) => {
      this.userid = val;
      firebase.database().ref().child(`userinfo/${this.userid}/trade_list/`).once('value', function(data){
        var user = data.val();
        _this.TradePost = Object.keys(user);

        for(let i=0;i<_this.TradePost.length;i++){
          firebase.database().ref().child(`board/${user[_this.TradePost[i]]}`).once('value', function(data){
            var stock = data.val();
            console.log("%%%%%%%%%%%%%"+_this.items[i]);
            if(stock['type']==="공동구매"){
              _this.items.push(stock);
              console.log(_this.items[i]);
            }
          });
        }
       });
     });
  }

  getPost(item: any) {
    this.postkey = item.postkey;
    this.writer = item.userid;
    this.router.navigate(['post', this.postkey, this.writer]);
  }
}
