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
  temp: any;
  public item: any;
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
    
    public alertCtrl: AlertController,
    public fs: AngularFirestoreModule,
    
  ) {
    /*this.stor.get('id').then((val) => {
      this.currentU = val;
      console.log(this.currentU);
    });*/
  }
  ngOnInit() {
    this.postkey = this.activatedRoute.snapshot.paramMap.get('postkey');
    this.writer = this.activatedRoute.snapshot.paramMap.get('writer');
    this.load();
    /*this.stor.get('id').then((val) => {
      this.currentU = val;
    });
    firebase.database().ref().once('value').then((snapshot) => {
                let c = snapshot.child(`board/${this.postkey}/userid`).val();  //id
                this.name = c;
      console.log(this.name);
    });*/
   
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
        /*this.db.list('userInfo/', ref => ref.orderByChild('userid').equalTo(this.writer)).valueChanges().subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            if (data.length !== 1) { return; } // TODO: Error exception
            let writerInfo;
            writerInfo = data[0]; 
           // document.getElementById('writerimg').setAttribute('src', writerInfo.userpic);
        });*/
    });
  }
  async chatMe() {
    const alert2 = await this.alertCtrl.create({
      header: '경고!',
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
