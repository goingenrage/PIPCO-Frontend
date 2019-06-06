import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrEventLogComponent } from './fr-event-log.component';

describe('FrEventLogComponent', () => {
  let component: FrEventLogComponent;
  let fixture: ComponentFixture<FrEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrEventLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrEventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
