import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpageComponent } from './mainpage.component';
import { VideoComponent } from '../video/video.component';
import { VideoSettingsComponent } from '../video-settings/video-settings.component';
import { EventLogComponent } from '../event-log/event-log.component';
import { EmailNotificationComponent } from '../email-notification/email-notification.component';
import { RangeSliderComponent } from '../range-slider/range-slider.component';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchComponent } from 'ngx-toggle-switch';
import { HttpClientModule } from '@angular/common/http';

describe('MainpageComponent', () => {
  let component: MainpageComponent;
  let fixture: ComponentFixture<MainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [ 
        MainpageComponent,
        VideoComponent,
        VideoSettingsComponent,
        EventLogComponent,
        EmailNotificationComponent,
        RangeSliderComponent,
        TitleBarComponent,
        UiSwitchComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
