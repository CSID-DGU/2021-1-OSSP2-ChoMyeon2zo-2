import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-check',
  templateUrl: './student-check.page.html',
  styleUrls: ['./student-check.page.scss'],
})
export class StudentCheckPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    //can get id/ email from sing.page 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
          const id = this.router.getCurrentNavigation().extras.state.id;
          console.log(id)
      }
  })
  }
  
  
}
