import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExerciceComponent } from './modify-exercice.component';

describe('ModifyExerciceComponent', () => {
  let component: ModifyExerciceComponent;
  let fixture: ComponentFixture<ModifyExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
