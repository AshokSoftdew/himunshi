import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchshowonMapComponent } from './searchshowon-map.component';

describe('SearchshowonMapComponent', () => {
  let component: SearchshowonMapComponent;
  let fixture: ComponentFixture<SearchshowonMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchshowonMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchshowonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
