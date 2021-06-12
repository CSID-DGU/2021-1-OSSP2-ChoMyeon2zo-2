import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { validateEventsArray } from '@angular/fire/firestore';
import {AngularFireStorage}from 'angularfire2/storage';
import {AngularFireDatabase}from 'angularfire2/database';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { Camera } from '@ionic-native/camera/ngx';

let _this;
@Component({
  selector: 'app-profile-modify',
  templateUrl: './profile-modify.page.html',
  styleUrls: ['./profile-modify.page.scss'],
})
export class ProfileModifyPage {
  tmpimgurl:any;
  picname: string = "";
  imageURI: string = "";
  public userpic:string="";
  public userid:string="";
  public name:string="";
  public email:string="";
  public major:string="";
  public credit:string="";
  public num:number=0;
  public check:string="";
  public school:string="";
  public nickname:string="";
  public phone:number=0;
  public trade_credit:number=0;

  public majorInput: string=''; 
  public phoneInput: string='';
  public nickInput: string='';
  public credit_str: string; 
  constructor(
    public navCtrl: NavController, 
    // private alertCtrl: AlertController,
    public fAuth: AngularFireAuth,
    private alertCtrl:AlertController,
    public db:AngularFireDatabase,
    public stor: Storage,
    public router: Router,
    public st: AngularFireStorage,
    private camera: Camera
  ) {_this=this; var a;}

  ngOnInit(){
    this.stor.get('id').then((val) => {
      console.log('val = '+val);
      this.userid = val;
      firebase.database().ref().child(`userinfo/${this.userid}`).once('value', function(data){
        var user = data.val();
        _this.userpic=user['userpic'];
        _this.name=user['name'];
        _this.email=user['email'];
        _this.major=user['major'];
        _this.credit=user['student_credit'];
        _this.nickname=user['nickname'];
        _this.school=user['school'];
        _this.trade_credit=user['trade_credit'];
        _this.trade_count=user['trade_count'];
        _this.phone=user['phone'];
        if((_this.trade_count) !== 0){
          _this.trage_credit_score = _this.trade_credit/_this.trade_count;
          if(_this.trage_credit_score<5 && _this.trage_credit_score>=4)
          {
               _this.credit_str="매우좋음";
          }
          else if(_this.trage_credit_score<4 && _this.trage_credit_score>=3)
          {
               _this.credit_str="좋음";
          }
          else if(_this.trage_credit_score<3 && _this.trage_credit_score>=2)
          {
               _this.credit_str="보통";
          }
          else if(_this.trage_credit_score<2 && _this.trage_credit_score>=1)
          {
               _this.credit_str="나쁨";
          }
          else
          {
            _this.credit_str="매우 나쁨";
          }
        }
        else{
          _this.trage_credit_score = 0
        }
        _this.set();
       })
     });
  }

  set(){
    this.userpic=_this.userpic;
    this.name=_this.name;
    this.nickname=_this.nickname;
    this.school=_this.school;
    this.email=_this.email;
    this.major=_this.major;
    this.phone=_this.phone;
    console.log('credit = '+_this.credit);
    if(_this.credit==false){
      this.check="재학생 미인증";
    }
    else {
      this.check="재학생 인증";
    }
    console.log('set name='+_this.name+' '+this.name);
  }
  ionViewDidLeave(){
    console.log('leave');

  }

  movetorecheck(){
    
    var studentnum;
    try{
    firebase.database().ref().child(`userinfo/${this.userid}`).on('value', function(data){
      var user = data.val();
      studentnum=user['student_number'];
      console.log('학번 = '+studentnum);
    });}
    catch(err) {console.log(err);}
    let info: NavigationExtras = {
      state: {
        id:this.userid,
        name:this.name,
        phone:this.phone,
        student_num:studentnum
      } 
    };
    this.router.navigate(['/student-recheck'],info);
  }

  modify(){
   /* if(this.majorInput===''||this.phoneInput===''){
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
    }*/ 
      var profileRef = firebase.database().ref(`userinfo/${this.userid}`);
      profileRef.update({
        phone :  this.phoneInput,
        major :  this.majorInput,
        nickname : this.nickInput
      });
      alert('프로필이 수정되었습니다.');
      this.ngOnInit();
      this.router.navigate(['/my-profile']);
    
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
      document.getElementById('upic').setAttribute('src', 'data:image/jpeg;base64,' + imageURI);
      this.imageURI = imageURI;
      this.picname = newName;
      this.st.ref(`userpic/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'}).then( value => {
        this.showImage();
      });

    },(err) => {
      console.log('err:' + JSON.stringify(err));
    });
  }
  showImage() {
    // tslint:disable-next-line: prefer-const
          let storageRef = firebase.storage().ref();
    // tslint:disable-next-line: prefer-const
          let imageRef = storageRef.child(`userpic/${this.picname}`);
          // console.log(imageRef.getDownloadURL());
          imageRef.getDownloadURL()
          .then((imageURI) => {
            this.tmpimgurl = imageURI;
            this.db.object(`userinfo/${this.userid}/userpic`).set(this.tmpimgurl);
            this.stor.set('pic', this.tmpimgurl);
          });
        }

}
