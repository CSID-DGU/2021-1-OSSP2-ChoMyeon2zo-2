import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

let _this;
@Component({
  selector: 'app-my-like',
  templateUrl: './my-like.page.html',
  styleUrls: ['./my-like.page.scss'],
})
export class MyLikePage implements OnInit {
  public userid : string;
  public postkey: string;  
  public writer: string;
  public items=[];

  constructor(      
    public stor: Storage,
    public navCtrl: NavController, 
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertCtrl: AlertController  
    ) { _this=this;}

  ngOnInit() {
    this.stor.get('id').then((val) => {
      this.userid = val;
      firebase.database().ref().child(`userinfo/${this.userid}/like_list/`).once('value', function(data){
        var user = data.val();
        _this.LikePost = Object.keys(user);

        for(let i=0;i<_this.LikePost.length;i++){
          if(_this.LikePost[i] !== '0'){
            firebase.database().ref().child(`board/${user[_this.LikePost[i]]}`).once('value', function(data){
              _this.items.push(data.val());
            });
          }
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
