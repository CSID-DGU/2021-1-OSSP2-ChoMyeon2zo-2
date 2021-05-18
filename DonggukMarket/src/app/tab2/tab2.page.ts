import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public postkey: string;
  public writer: string;
  public items=[];
  public writerInfo=[];
  segment:string;

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
      public stor : Storage,
      public ac:ActivatedRoute,
    ) {
    }
    ngOnInit(){
      this.segment='대여';
      this.loadList();
    }
    segmentChanged(event){
      this.segment=event.detail.value;
      this.loadList();
    }
    loadList(){
        this.db.list('board/',ref=>ref.orderByChild('type').equalTo(this.segment)).valueChanges().subscribe(data=>{this.items=data;})
    }
    goCreatePost() {
      this.router.navigate(['board']);
    }
    getPost(item: any) {
      this.postkey = item.postkey;
      this.writer = item.userid;
      this.router.navigate(['post', this.postkey, this.writer]);
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

                var user1;
                this.stor.get('id').then((val) => { user1 = val; });
                var user2 = this.ac.snapshot.paramMap.get('you');

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
