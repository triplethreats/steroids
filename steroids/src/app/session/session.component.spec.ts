import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionComponent } from './session.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddExerciceComponent } from '../add-exercice/add-exercice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionComponent, AddExerciceComponent ],
      imports: [ ReactiveFormsModule, AppRoutingModule ],
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
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
