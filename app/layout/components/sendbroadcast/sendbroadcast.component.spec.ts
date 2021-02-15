import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendbroadcastComponent } from './sendbroadcast.component';

describe('SendbroadcastComponent', () => {
  let component: SendbroadcastComponent;
  let fixture: ComponentFixture<SendbroadcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendbroadcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendbroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
