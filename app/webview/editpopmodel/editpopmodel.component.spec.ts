import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpopmodelComponent } from './editpopmodel.component';

describe('EditpopmodelComponent', () => {
  let component: EditpopmodelComponent;
  let fixture: ComponentFixture<EditpopmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpopmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpopmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
