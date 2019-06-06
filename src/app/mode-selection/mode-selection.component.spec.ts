import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelectionComponent } from './mode-selection.component';

describe('ModeSelectionComponent', () => {
  let component: ModeSelectionComponent;
  let fixture: ComponentFixture<ModeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
