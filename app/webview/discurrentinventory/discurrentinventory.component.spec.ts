import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscurrentinventoryComponent } from './discurrentinventory.component';

describe('DiscurrentinventoryComponent', () => {
  let component: DiscurrentinventoryComponent;
  let fixture: ComponentFixture<DiscurrentinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscurrentinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscurrentinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
