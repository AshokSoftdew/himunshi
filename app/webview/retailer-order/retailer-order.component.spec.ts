import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerOrderComponent } from './retailer-order.component';

describe('RetailerOrderComponent', () => {
  let component: RetailerOrderComponent;
  let fixture: ComponentFixture<RetailerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
