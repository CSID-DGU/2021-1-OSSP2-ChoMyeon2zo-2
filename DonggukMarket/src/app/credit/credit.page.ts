import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import {Storage} from '@ionic/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})

export class CreditPage implements OnInit{

    you:string;
    trade_credit:number; // 신뢰도
    trade_count:number; 
    tradevalue:number;

    constructor(
        public fs:AngularFirestoreModule, 
        public atrCtrl:AlertController,
        public router: Router,
        public db:AngularFireDatabase,
        public fb : AngularFirestore,
        public stor : Storage,
        public ac:ActivatedRoute,
        public navCtrl: NavController, 
    ){
        
        this.you = this.ac.snapshot.paramMap.get('you');
    }

    ngOnInit(){};
    

    async setTrade(){
        firebase.database().ref().once('value').then((snapshot) => {
            let v = snapshot.child(`userinfo/${this.you}/trade_credit`).val()
            this.trade_credit = v*1;
            console.log(this.trade_credit);
            let c = snapshot.child(`userinfo/${this.you}/trade_count`).val();
            this.trade_count = c
            this.trade_count = c*1;
           

            console.log(this.tradevalue);
        this.trade_credit= Number(this.trade_credit) + Number(this.tradevalue*1);
        this.trade_count = this.trade_count + 1;
        let strArray = this.you;    
        this.db.object(`userinfo/${strArray}/trade_credit`).set(this.trade_credit);
        this.db.object(`userinfo/${strArray}/trade_count`).set(this.trade_count);
        });
        const al = await this.atrCtrl.create({
            message: '거래가 완료되었습니다.',
            buttons: ['닫기']
        })

        await al.present();
        this.navCtrl.navigateRoot('tabs/tab3');
        
    }
}
