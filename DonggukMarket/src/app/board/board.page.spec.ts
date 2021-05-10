import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { boardpage } from './board.page';
describe('boardPage', () => {
  let component: boardpage;
  let fixture: ComponentFixture<boardpage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [boardpage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(boardpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
