import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExerciceComponent } from './modify-exercice.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

describe('ModifyExerciceComponent', () => {
  let component: ModifyExerciceComponent;
  let fixture: ComponentFixture<ModifyExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyExerciceComponent ],
      imports: [ HttpClientModule, ReactiveFormsModule, AppRoutingModule ]
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
