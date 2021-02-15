import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareappComponent } from './shareapp.component';

describe('ShareappComponent', () => {
  let component: ShareappComponent;
  let fixture: ComponentFixture<ShareappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
