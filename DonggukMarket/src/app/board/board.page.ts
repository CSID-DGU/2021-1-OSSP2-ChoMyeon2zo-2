import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireStorage}from 'angularfire2/storage';
import {AngularFireDatabase}from 'angularfire2/database';
//import { Camera } from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage'
//import firebase from 'firebase/app';
import *as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { boardpageRoutingModule } from './board-routing.module';
import {Camera} from '@ionic-native/camera/ngx';
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
  public boardnick: string=''; 
  public boardmajor: string='';
  public boardnickname: string='';
  public boardschool: string='';
  picname: string = "";
  imageURI: string = "";
  tmpimgurl:any;
  regisBoard={
    userid:'',
    category:'',
    type:'',
    titleInput:'',
    price:'',
    textInput:'',
    postkey:'',
    img:'',
    like:0 ,
    boardnick:'',
    time:'',
    type_school:''
  }
  constructor(
    public stor:Storage,
    private alertCtrl:AlertController,
    public db:AngularFireDatabase,
    public st:AngularFireStorage,
    public router:Router,
   private camera:Camera
  ) {
    this.stor.get('id').then((val)=>{
      this.userid=val;
    });
    firebase.database().ref().once('value').then((snapshot) => {
      this.boardmajor = snapshot.child(`userinfo/${this.userid}/major`).val();  //전공
      this.boardnickname=snapshot.child(`userinfo/${this.userid}/nickname`).val(); //닉네임
      this.boardschool=snapshot.child(`userinfo/${this.userid}/school`).val();
       });
  }
  ngOnInit() {
  }
  pickPicture() {
    // tslint:disable-next-line:prefer-const
    let options = {
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageURI) => {
      // tslint:disable-next-line:prefer-const
      let newName = `${new Date().getTime()}.png`;
      console.log(imageURI);
      // 이미지 미리보기
      document.getElementById('imgboard').setAttribute('src', 'data:image/jpeg;base64,' + imageURI);
      this.imageURI = imageURI;
      this.picname = newName;
      console.log(this.picname);
      this.st.ref(`picture/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'});
    }, (err) => {
      console.log('err:' + JSON.stringify(err));
    });
  }
  showImage() {
    // tslint:disable-next-line: prefer-const
          let storageRef = firebase.storage().ref();
    // tslint:disable-next-line: prefer-const
          let imageRef = storageRef.child(`picture/${this.picname}`);
          imageRef.getDownloadURL()
          .then((imageURI) => {
            console.log(imageURI);
            this.tmpimgurl = imageURI;
            this.db.object(`board/${this.postkey}/img`).set(this.tmpimgurl);
          });
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
      let today=new Date();
      let year=today.getFullYear();
      let month=today.getMonth();
      let day=today.getDate();
      let hours=today.getHours();
      let minutes = today.getMinutes();
      let seconds= today.getSeconds();
      let bt=year+'.'+month+'.'+day+'.'+hours+'.'+minutes+'.'+seconds;
      this.regisBoard.userid= this.userid;
      this.regisBoard.category=this.category;
      this.regisBoard.type=this.type;
      this.regisBoard.price=this.price;
      this.regisBoard.titleInput=this.titleInput;
      this.regisBoard.textInput=this.textInput;
      this.regisBoard.type_school=this.type+this.boardschool;
      this.postkey = new Date().getTime();
      if(this.type==='공동구매')
      {
        
        this.db.object(`userinfo/${this.userid}/trade_list/group/${this.postkey}`).set(this.postkey);  
      }
      else if(this.type==='판매')
      {
        this.db.object(`userinfo/${this.userid}/trade_list/sell/${this.postkey}`).set(this.postkey);  
      }
      else if(this.type==='대여')
      {
        console.log(this.type)
        this.db.object(`userinfo/${this.userid}/trade_list/rent/${this.postkey}`).set(this.postkey);  
      }
     // this.regisBoard.img='assets/main_img.png';
      this.regisBoard.postkey = String(this.postkey);
      this.regisBoard.like=0; 
      this.regisBoard.boardnick=this.boardmajor+" "+this.boardnickname;
      this.regisBoard.time=bt;
      this.showImage();
      this.db.object(`board/${this.postkey}`).set(this.regisBoard);
      alert('글이 등록되었습니다.');
      this.router.navigateByUrl('/tabs/tab3');
    }
  }
  }
  
}