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
  selector: 'app-student-recheck',
  templateUrl: './student-recheck.page.html',
  styleUrls: ['./student-recheck.page.scss'],
})
export class StudentRecheckPage implements OnInit {
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
  priorPage(){
    this.navCtrl.navigateRoot('tabs/tab5');
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
      message: '이미지 인식은 대략<br>20~30초가 소요됩니다',
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
      console.log(newtext.includes('성명'+this.name+'\\n')+' '+this.name);
      console.log(newtext.includes('학번'+this.s_num+'\\n')+' '+this.s_num);
      console.log(newtext.includes('휴대폰'+this.phone+'\\n')+' '+this.phone);
      if(newtext.includes('성명'+this.name+'\\n') && newtext.includes('학번'+this.s_num+'\\n') && newtext.includes('휴대폰'+this.phone+'\\n')){
        const alert1 = await this.alertCtrl.create({
          message: '인증이 완료되었습니다.<br>메인으로 이동합니다',
          buttons: [{
            text: '확인',
            handler: () => {
            console.log('Confirm Okay');
            this.navCtrl.navigateRoot('/');
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
          message: '인증이 실패했습니다.<br>마이페이지로 이동합니다',
          buttons: [
            {
            text: '돌아가기',
            handler: () => {
            console.log('Confirm Okay');
            _this.navCtrl.navigateRoot('/sign');
            }
            }
          ]
        });
        await alert2.present();
      }
    })();
  }

  ngOnInit() {
    //can get id/ email from sing.page 
    this.route.queryParams.subscribe(params => {    
      if (this.router.getCurrentNavigation().extras.state) {
          this.id = this.router.getCurrentNavigation().extras.state.id;
          this.name = this.router.getCurrentNavigation().extras.state.name;
          this.s_num = this.router.getCurrentNavigation().extras.state.student_num;
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
          console.log(this.id+' '+this.name+' '+this.s_num+' '+this.phone);
      }
    })
  }
  ionViewWillEnter(){
  };
  
}