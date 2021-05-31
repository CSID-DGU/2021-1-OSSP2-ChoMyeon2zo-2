import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})

export class ChatRoomPage implements OnInit {
  

    text:string;
    me:string;
    you:string;
    chatRef:any;
    userid:string;
    size:number; // 총 채팅내용 개수
    index:number; // 채팅 내용이 몇번째 컨텐츠인지
    user1:string; // uid1과 uid2를 string으로 저장하기 위함
    user2:string;
    number:number; // 채팅방 번호 찾기 위한 변수
    tmpid:string;
    tmpYou:string;
    currentU:string;
    chatnum:number; // 몇번째 채팅내용인지 찾기 위한 변수

    isfinish : boolean = false;
    trade_credit:number=0; // 신뢰도
  
    constructor(
      public fs:AngularFirestoreModule, 
      public atrCtrl:AlertController,
      public router: Router,
      public db:AngularFireDatabase,
      public fb : AngularFirestore,
      public stor : Storage,
      public ac:ActivatedRoute,
      ) { 
        this.chatRef = fb.collection('chats',ref=>ref.orderBy('Timestamp')).valueChanges();
        this.you = this.ac.snapshot.paramMap.get('you');
        this.stor.get('id').then((val) => { this.currentU = val; });
    }
   
    ngOnInit(){}
    
    send(){
      if(this.text!=''){
        const db=firebase.firestore();
        db.collection('chats').get().then(snapshot=>{
          this.size=snapshot.size;
          console.log("chatting : "+this.size);
          if(this.size===0){
            this.index=0;
            db.collection('ChatSize').doc('index').set({
              index:this.index
            });
            db.collection('chats').doc((this.index).toString()).set({
              me:this.currentU,
              you:this.you,
              Message:this.text,
              Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
              num:this.index
            });
            this.text='';
            console.log("size0일 때 : "+this.index);
          }
          else{
           db.collection('ChatSize').get().then(snapshot=>{
              snapshot.forEach(doc=>{
                let getSize=doc.data().index;
                this.index=getSize;
                this.index=this.index+1;
                db.collection('ChatSize').doc('index').set({
                  index:this.index
                });
                db.collection('chats').doc((this.index).toString()).set({
                  me:this.currentU,
                  you:this.you,
                  Message:this.text,
                  Timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                  num:this.index
                });
                console.log("size 0아닐때: "+this.index);
              });
              this.text='';
            });
          }
        });
      }
    }
    async alertDelete(){
      const alert = await this.atrCtrl.create({
        header:'확인!',
        message: '채팅방이 삭제되었습니다.',
        buttons:[
          {
            text:'Okay',
            role:'cancel',
            handler:(blah)=>{
              console.log('채팅방 삭제');
              this.router.navigateByUrl('tabs/tab4');
            }
          }
        ]
      });
      await alert.present();
    }
  
    async deleteRoom(){ // 채팅 목록 삭제
  
      const al = await this.atrCtrl.create({
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
              const db=firebase.firestore();
              const collection=db.collection('chatting');
              const collection2=db.collection('chats');
              collection.get().then(snapshot=>{
                snapshot.forEach(doc=>{
                  let get1=doc.data().uid1;
                  let get2=doc.data().uid2;
                  let getIndex=doc.data().num;
                  this.user1=get1;
                  this.user2=get2;
                  this.number=getIndex;
                  if((this.user1===this.you && this.user2===this.currentU) || (this.user2===this.you && this.user1===this.currentU)){
                    db.collection("chatting").doc((this.number).toString()).delete();
                    console.log("Delete list");
                    collection2.get().then(snapshot=>{
                      snapshot.forEach(doc=>{
                        let getid=doc.data().id;
                        let getYou=doc.data().You;
                        let getCIdx=doc.data().num;
                        this.userid=getid;
                        this.tmpYou=getYou;
                        this.chatnum=getCIdx;
                        if((this.tmpid===this.currentU && this.tmpYou===this.you)|| (this.tmpid===this.you && this.tmpYou===this.currentU)){
                          console.log(doc.data().Message);
                          db.collection("chats").doc((this.chatnum).toString()).delete();
                          console.log("Delete contents");
                        }
                      });
                    });
                  }
                  this.alertDelete();
                });
              });
            }
          }
        ]
      });
      await al.present();
    }

    async evalueReliablity(){
      const al = await this.atrCtrl.create({
        header:'확인!',
        message: '거래를 완료하시겠습니까?',
        buttons:[
          {
            text:'Cancel',
            role:'cancel',
            cssClass:'secondary',
            handler:(blah)=>{
              console.log("삭제 취소");
            }
          },{
            text:'Okay',
            handler: () => {
              console.log('Confirm Okay');
              
            this.router.navigate(['credit',this.you]);
            let strArray = this.you;    
            this.db.object(`userinfo/${strArray}/trade_credit`).set(this.trade_credit);
            // you id랑 같은 아이디에서 신뢰도 가져오기 
           }
         }
        ]
      });
      await al.present();
    }
  }

 

