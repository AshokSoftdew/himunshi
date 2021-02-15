import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseremidetailsComponent } from './useremidetails.component';

describe('UseremidetailsComponent', () => {
  let component: UseremidetailsComponent;
  let fixture: ComponentFixture<UseremidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseremidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseremidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
