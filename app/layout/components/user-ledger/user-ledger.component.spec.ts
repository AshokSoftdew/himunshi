import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLedgerComponent } from './user-ledger.component';

describe('UserLedgerComponent', () => {
  let component: UserLedgerComponent;
  let fixture: ComponentFixture<UserLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
