import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { EventLogComponent } from './event-log/event-log.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { VideoSettingsComponent } from './video-settings/video-settings.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { DirectionalPadComponent } from './directional-pad/directional-pad.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoComponent,
    LoginComponent,
    MainpageComponent,
    EmailNotificationComponent,
    EventLogComponent,
    TitleBarComponent,
    VideoSettingsComponent,
    RangeSliderComponent,
    GenericButtonComponent,
    DirectionalPadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
