import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogComponent } from './event-log.component';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchComponent } from 'ngx-toggle-switch';
import { HttpClientModule } from '@angular/common/http';

describe('EventLogComponent', () => {
  let component: EventLogComponent;
  let fixture: ComponentFixture<EventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [ 
        EventLogComponent,
        TitleBarComponent,
        UiSwitchComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
