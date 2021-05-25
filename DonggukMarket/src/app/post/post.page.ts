import { Component, OnInit } from '@angular/core';
//import {NavController, AlertController} from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Router , ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
//import firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@Component({
    selector: 'app-post',
    templateUrl: './post.page.html',
    styleUrls: ['./post.page.scss'],
  })
  export class PostPage implements OnInit {
  //좋아요 추가
  public likeState: string='unliked';
  public iconName: string = 'heart-empty';
  public isFavorite=false; 
  temp: any;
  public item: any;
  public writerinfo: any; 
  postkey: string;
  writer: string;
  headert: string;
  public itemtmp: any;
  currentU: string;
  name: string;
  chattingRef: any;
  check = false; // 채팅 목록
  size: number; // 채팅 목록 수
  getSize: any;
  getuid1: string;
  getuid2: string;
  index: number;
  first = true; // 처음 추가되는 채팅목록인지
  
  constructor(
    public router: Router,
    public navCtrl: NavController,
    public plat:Platform,
    public activatedRoute:ActivatedRoute,
    public db:AngularFireDatabase,
    public stor:Storage,
    public alertCtrl: AlertController,
    public fs: AngularFirestoreModule,
  ) {
    this.stor.get('id').then((val) => {
      this.currentU = val;
    });
  }
  ngOnInit() {
    this.postkey = this.activatedRoute.snapshot.paramMap.get('postkey');
    this.writer = this.activatedRoute.snapshot.paramMap.get('writer');
    this.load();
    this.stor.get('id').then((val) => {
      this.currentU = val;
    });
    firebase.database().ref().once('value').then((snapshot) => {
      let c = snapshot.child(`userinfo/${this.currentU}/like_list/${this.postkey}`).val();  //자기 리스트에 좋아요가 있는지
       if(c==null)
       {
        this.isFavorite=false; 
       }
       else
       {
        this.isFavorite=true; 
       }
    });
    firebase.database().ref().once('value').then((snapshot) => {
                let c = snapshot.child(`board/${this.postkey}/userid`).val();  //id
                this.name = c;
    });
   
  }
  load() {
    this.db.list('board/', ref => ref.orderByChild('postkey').equalTo(this.postkey)).valueChanges().subscribe(
      data => {
        if (data.length !== 1) { return; } // TODO: Error exception
        this.item = data;
        this.itemtmp = data[0];
        if (this.itemtmp.type === '판매') {
          this.headert = '판매';
        } else if(this.itemtmp.type === '대여') {
          this.headert = '대여';
        }
        else if(this.itemtmp.type === '공동구매') {
          this.headert = '공동구매';
        }
        else{
          this.headert = '살게요';
        }
      /*  this.db.list('userInfo/', ref => ref.orderByChild('userid').equalTo(this.writer)).valueChanges().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            if (data.length !== 1) { return; } // TODO: Error exception
            this.writerinfo = data; 
           // document.getElementById('writerimg').setAttribute('src', writerInfo.userpic);
        });*/
    });

  }
  async deletepost()
  {
    const al = await this.alertCtrl.create({
      header:'확인!',
      message: '채팅방을 삭제하시겠습니까?',
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          cssClass:'secondary',
          handler:(blah)=>{
            console.log("삭제 취소");
          }
        },
        {
          text:'Okay',
          handler:()=>{
            console.log('채팅방 삭제');
            this.db.object(`board/${this.postkey}`).set(null);
            this.alertDeletepost();
          }
        }
      ]
    });
    await al.present();
  }
  async alertDeletepost(){
    const alert = await this.alertCtrl.create({
      header:'확인!',
      message: '게시판이 삭제되었습니다.',
      buttons:[
        {
          text:'Okay',
          role:'cancel',
          handler:(blah)=>{
            console.log('게시판 삭제');
            this.router.navigateByUrl('tabs/tab3');
          }
        }
      ]
    });
    await alert.present();
  }
    favoritePost() {
      if(!this.currentU){
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
      else{
        this.isFavorite = true;
      firebase.database().ref().once('value').then((snapshot) => {
                  var likeCount = snapshot.child(`board/${this.postkey}/like`).val(); // 좋아요 수
                  likeCount = likeCount + 1;
                  this.db.object(`board/${this.postkey}/like`).set(likeCount);
                  this.db.object(`userinfo/${this.currentU}/like_list/${this.postkey}`).set(this.postkey);        
        });
      }
    }
    unfavoritePost() {
        this.isFavorite = false;
       firebase.database().ref().once('value').then((snapshot) => {
        var likeCount = snapshot.child(`board/${this.postkey}/like`).val(); // 좋아요 수
        likeCount = likeCount - 1;
        this.db.object(`board/${this.postkey}/like`).set(likeCount);
        this.db.object(`userinfo/${this.currentU}/like_list/${this.postkey}`).set(null);        
              });
    }
  async chatMe() {
    const alert2 = await this.alertCtrl.create({
      header: '확인!',
      message: '본인이 작성한 게시글입니다',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: (blah) => {
            console.log('chat with me');
          }
        }
      ]
    });
    await alert2.present();
  }

  async CreateChat(you:string){
    if(!this.currentU){
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
    else{
    this.check = false;
    const alert = await this.alertCtrl.create({
        header: '확인!',
        message: '<strong>' + you + '</strong>' + '와 채팅하시겠습니까??',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');

              var user1 = "current user";
              var user2 = you;

              if ( user1 === user2 ) { // 채팅 대상자가 본인인 경우
                this.chatMe();
              } else { // 채팅방 생성 
                this.chattingRef = firebase.firestore().collection('chatting')
                const db = firebase.firestore();
                const collection = db.collection('chatting');

                collection.get().then(snapshot => {
                  snapshot.forEach(doc => {
                    let get1 = doc.data().uid1;
                    let get2 = doc.data().uid2;
                    this.getuid1 = get1;
                    this.getuid2 = get2;
                    if ((user1 === this.getuid1 && user2 === this.getuid2) || (user1 === this.getuid2 && user2 === this.getuid1)) {
                      this.check = true;
                    }
                  });
                  if (this.check === false)
                  {
                    this.size = snapshot.size;
                    if (this.size === 0) { // 채팅 목록이 한개도 없음
                      this.index = 0;
                      firebase.firestore().collection('ListSize').doc('index').set({
                        index: this.index
                      });
                      firebase.firestore().collection('chatting').doc((this.index).toString()).set({
                        uid1: "current user",
                        uid2: you,
                        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        num: this.index
                      });
                    } else { // 채팅 목록이 1개이상 존재할 때
                      db.collection('ListSize').get().then( snapshot => {
                        snapshot.forEach(doc => {
                          this.getSize = doc.data().index;
                          this.index = this.getSize;
                          this.index = this.index + 1;
                          firebase.firestore().collection('chatting').doc((this.index).toString()).set({
                            uid1: "current user",
                            uid2: you,
                            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            num: this.index
                          });
                          firebase.firestore().collection('ListSize').doc('index').set({
                            index: this.index
                          });
                        });
                      });
                    }
                    console.log('new chatting list');
                  }
                });
                this.router.navigate(['chat-room',you]);
              }
            }
          }
        ]
    });
    await alert.present();
  }
}


}
