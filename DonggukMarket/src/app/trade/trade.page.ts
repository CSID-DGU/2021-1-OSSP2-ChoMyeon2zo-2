import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
})

export class TradePage implements OnInit{

    you:string;
    trade_credit:number=0; // 신뢰도 

    constructor(
        public fs:AngularFirestoreModule, 
        public atrCtrl:AlertController,
        public router: Router,
        public db:AngularFireDatabase,
        public fb : AngularFirestore,
        public stor : Storage,
        public ac:ActivatedRoute,
    ){
        this.you = this.ac.snapshot.paramMap.get('you');
    }

    ngOnInit(){}

    setTrade(){

        let strArray = this.you;    
        this.db.object(`userinfo/${strArray}/trade_credit`).set(this.trade_credit);
        // you id랑 같은 아이디에서 신뢰도 가져오기 
    }
}