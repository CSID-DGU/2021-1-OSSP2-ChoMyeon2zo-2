import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireStorage}from 'angularfire2/storage';
import {AngularFireDatabase}from 'angularfire2/database';
//import { Camera } from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage'
//import firebase from 'firebase/app';
//import *as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-board',
  templateUrl: 'board.page.html',
  styleUrls: ['board.page.scss']
})
export class boardpage {

  public userid: string; 
  public category: string='';
  public type: string=''; 
  public titleInput: string=''; 
  public price: string=''; 
  public textInput: string=''; 
  public like: number=0; 

  public postkey;
  regisBoard={
    userid:'',
    category:'',
    type:'',
    titleInput:'',
    price:'',
    textInput:'',
    postkey:'',
    img:'',
    time:'',
    like:0 
    
  }
  constructor(
    public stor:Storage,
    private alertCtrl:AlertController,
    public db:AngularFireDatabase,
    public st:AngularFireStorage,
    public router:Router,
   //private camera:Camera
  ) {
    this.stor.get('id').then((val)=>{
      this.userid=val;
    });
     console.log(this.userid);
  }
  ngOnInit() {
  }
  register(){
    if(!this.userid){
      this.alertCtrl.create({
        header:'',
        message: '로그인 후 이용해주세요',
        buttons:[{
          text:'확인',
          role: 'cancel'
        }]
      }).then(alertEI=>{
        alertEI.present();
      });
      this.router.navigateByUrl('login');
    }
    else
    {
    if(this.userid===''||this.category===''||this.type===''||this.titleInput===''||this.price===''||this.textInput===''){
      this.alertCtrl.create({
        header: '',
        message: '내용을 전부 입력해주세요',
        buttons: [{
          text: '확인',
          role: 'cancel'
        }]
      }).then(alertEI=>{
        alertEI.present();
      });
      return 0;
    } else {
      this.regisBoard.userid= this.userid;
      this.regisBoard.category=this.category;
      this.regisBoard.type=this.type;
      this.regisBoard.price=this.price;
      this.regisBoard.titleInput=this.titleInput;
      this.regisBoard.textInput=this.textInput;
      this.postkey = new Date().getTime();
      this.regisBoard.img='assets/main_img.png';
      this.regisBoard.postkey = String(this.postkey);
      this.regisBoard.like=0; 
      this.db.object(`board/${this.postkey}`).set(this.regisBoard);
      alert('글이 등록되었습니다.');
     /* if (this.regisTxt.img !== '') {
        this.showImage();
     }*/
      this.router.navigateByUrl('/tabs/tab3');
    }
  }
  }
  
}