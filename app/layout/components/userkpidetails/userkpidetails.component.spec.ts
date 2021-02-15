import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserkpidetailsComponent } from './userkpidetails.component';

describe('UserkpidetailsComponent', () => {
  let component: UserkpidetailsComponent;
  let fixture: ComponentFixture<UserkpidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserkpidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserkpidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
