import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSmsComponent } from './manage-sms.component';

describe('ManageSmsComponent', () => {
  let component: ManageSmsComponent;
  let fixture: ComponentFixture<ManageSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
