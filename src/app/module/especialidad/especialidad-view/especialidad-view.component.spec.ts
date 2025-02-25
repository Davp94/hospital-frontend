import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadViewComponent } from './especialidad-view.component';

describe('EspecialidadViewComponent', () => {
  let component: EspecialidadViewComponent;
  let fixture: ComponentFixture<EspecialidadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialidadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
