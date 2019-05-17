import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceComponent } from './exercice.component';
import { AddSeriesComponent } from '../add-series/add-series.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModifySerieComponent } from '../modify-serie/modify-serie.component';

describe('ExerciceComponent', () => {
  let component: ExerciceComponent;
  let fixture: ComponentFixture<ExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciceComponent, AddSeriesComponent, ModifySerieComponent ],
      imports: [ ReactiveFormsModule, AppRoutingModule, HttpClientModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' })
          }
        },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
