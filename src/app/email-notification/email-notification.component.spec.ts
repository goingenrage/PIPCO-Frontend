import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationComponent } from './email-notification.component';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchComponent } from 'ngx-toggle-switch';
import { HttpClientModule } from '@angular/common/http';

describe('EmailNotificationComponent', () => {
  let component: EmailNotificationComponent;
  let fixture: ComponentFixture<EmailNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [ 
        EmailNotificationComponent,
        TitleBarComponent,
        UiSwitchComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
