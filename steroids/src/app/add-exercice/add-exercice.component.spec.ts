import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciceComponent } from './add-exercice.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddExerciceComponent', () => {
  let component: AddExerciceComponent;
  let fixture: ComponentFixture<AddExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciceComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
