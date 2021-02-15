import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BukusettingsComponent } from './bukusettings.component';

describe('BukusettingsComponent', () => {
  let component: BukusettingsComponent;
  let fixture: ComponentFixture<BukusettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BukusettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BukusettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
