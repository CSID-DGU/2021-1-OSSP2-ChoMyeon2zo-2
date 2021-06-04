import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public cate: string; 
  constructor(public router: Router) { }

  ngOnInit() {
  }
  getPost1()
  {
    this.cate = "디지털&가전";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost2()
  {
    this.cate = "가구&인테리어";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost3()
  {
    this.cate = "남성패션&잡화";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost4()
  {
    this.cate = "여성의류";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost5()
  {
    this.cate = "여성잡화";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost6()
  {
    this.cate = "스포츠&레저";
    this.router.navigate(['catepost', this.cate]);
  } getPost7()
  {
    this.cate = "게임&취미";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost8()
  {
    this.cate = "도서&티켓&음반";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost9()
  {
    this.cate = "기타중고물품";
    this.router.navigate(['catepost', this.cate]);
  }
  getPost10()
  {
    this.cate = "살게요";
    this.router.navigate(['catepost', this.cate]);
  }

}
