import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { EventLogComponent } from './event-log/event-log.component';
import { TitleBarComponent } from './title-bar/title-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoComponent,
    LoginComponent,
    MainpageComponent,
    EmailNotificationComponent,
    ToggleSwitchComponent,
    EventLogComponent,
    TitleBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
