import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController,NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js'
import { createWorker } from 'tesseract.js';
import { NgProgress } from '@ngx-progressbar/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

let _this;
@Component({
  selector: 'app-student-check',
  templateUrl: './student-check.page.html',
  styleUrls: ['./student-check.page.scss'],
})
export class StudentCheckPage implements OnInit {
  id:string="";
  name:string="";
  s_num:string="";
  school:string="";
  phone:string="";
  selectedImage: string;
  imageText: string;
  progress=false;
  worker = createWorker({
    logger: m => console.log(m)
  })
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    public db: AngularFireDatabase
    //public progress: NgProgress
  ) {
    _this=this;
  }
  async selectImage() {    
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: '갤러리',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, 
        {
          text: '닫기',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.ngOnInit();
    });
  }
  
  async recognizeImage() {
    console.log('dd');
    const alert = await this.alertCtrl.create({
      message: '이미지 인식은 대략 20~30초가 소요됩니다',
      buttons: ['닫기']
    });

    await alert.present();
    (async () => {
      await this.worker.load();
      this.progress = true;
      await this.worker.loadLanguage('kor');
      await this.worker.initialize('kor');
      const { data: { text } } = await this.worker.recognize(this.selectedImage);
      this.imageText = JSON.stringify(text);
      // this.imageText = this.imageText.split('\n').join("<br />")
      var newtext = this.imageText.replace(/ /g,"") //newtext 공백 제거됨.
      console.log('text = '+newtext);
      this.progress = false;
      await this.worker.terminate();
      console.log(newtext.includes(this.name));
      console.log(newtext.includes(this.name));
      console.log(newtext.includes(this.school));
      if(newtext.includes('성명'+this.name+'\n') && newtext.includes('학번'+this.s_num+'\n') && newtext.includes('휴대폰'+this.phone+'\n')){
        const alert1 = await this.alertCtrl.create({
          header: '가입완료',
          message: '인증이 완료되었습니다.로그인 화면으로 이동합니다',
          buttons: [{
            text: '확인',
            handler: () => {
            console.log('Confirm Okay');
            this.navCtrl.navigateRoot('/login');
            }
        }]});
        this.db.object(`userinfo/${this.id}/student_credit`).set(true); //재학생 인증 true
        var now = new Date();
        var year = String(now.getFullYear());
        var month = String(now.getMonth()+1);
        if(month.length==1) month='0'+month;
        
        var date =String( now.getDate());
        if(date.length==1) date = '0'+date;
        var nowDate = year+month+date;
        this.db.object(`userinfo/${this.id}/student_credit_date`).set(nowDate);//인증 시간
        await alert1.present();
        
      }
      else{
        this.selectedImage="";
        const alert2 = await this.alertCtrl.create({
          message: '인증이 실패했습니다. 회원가입 첫 단계로 이동합니다',
          buttons: [
            {
            text: '돌아가기',
            handler: () => {
            console.log('Confirm Okay');
            var user = firebase.auth().currentUser;
            console.log('user = '+user);
            user.delete().then(function() {
              console.log('Delete success');
            }).catch(function(error){console.log(error);})
    
            //db삭제
            try{
              firebase.database().ref().child(`userinfo/${this.id}`).remove();
              _this.navCtrl.navigateRoot('/sign');
            }
            catch(err) {console.log(err);}
          }}
        ]
        });
        await alert2.present();
      }
    })();
  }

  async notsign(){
    console.log('not sign');
    const alert1 = await this.alertCtrl.create({
      message: '진행된 내역을 삭제한 뒤, 메인화면으로 돌아갑니다.',
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('No');
        }},
        {
        text: '확인',
        handler: () => {
        console.log('Confirm Okay');
        var user = firebase.auth().currentUser;
        console.log('user = '+user);
        user.delete().then(function() {
          console.log('Delete success');
        }).catch(function(error){console.log(error);})

        //db삭제
        try{
          firebase.database().ref().child(`userinfo/${this.id}`).remove();
          _this.navCtrl.navigateRoot('tabs/tab3');
        }
        catch(err) {console.log(err);}
      }}
    ]});
    await alert1.present();
  }
  ngOnInit() {
    //can get id/ email from sing.page 
    this.route.queryParams.subscribe(params => {    
      if (this.router.getCurrentNavigation().extras.state) {
          this.id = this.router.getCurrentNavigation().extras.state.id;
          this.name = this.router.getCurrentNavigation().extras.state.name;
          this.s_num = this.router.getCurrentNavigation().extras.state.student_number;
          this.school = this.router.getCurrentNavigation().extras.state.school;
          var phone = this.router.getCurrentNavigation().extras.state.phone;
          console.log(phone);
          if(phone.length==11){
            phone=phone.slice(0,3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7);
          }
          else if(phone.length==10){
            phone=phone.slice(0,3) + '-' + phone.slice(3, 6) + '-' + phone.slice(7);
          }
          console.log(phone);
          this.phone=phone;
          console.log(this.id+' '+this.name+' '+this.s_num+' '+this.school+' '+this.phone);
      }
    })
  }
  ionViewWillEnter(){
  };
  
}