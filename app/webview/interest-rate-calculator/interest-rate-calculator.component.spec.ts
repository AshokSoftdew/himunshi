import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateCalculatorComponent } from './interest-rate-calculator.component';

describe('InterestRateCalculatorComponent', () => {
  let component: InterestRateCalculatorComponent;
  let fixture: ComponentFixture<InterestRateCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestRateCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestRateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
