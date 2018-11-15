import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionalPadComponent } from './directional-pad.component';

describe('DirectionalPadComponent', () => {
  let component: DirectionalPadComponent;
  let fixture: ComponentFixture<DirectionalPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionalPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionalPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
