import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySerieComponent } from './modify-serie.component';

describe('ModifySerieComponent', () => {
  let component: ModifySerieComponent;
  let fixture: ComponentFixture<ModifySerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
