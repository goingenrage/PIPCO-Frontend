import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
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
import { EmailService } from './shared/email.service';
import { HttpClientModule } from '@angular/common/http';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { StatusButtonComponent } from './status-button/status-button.component';
import { SettingsService } from './shared/settings.service';
import { EventService } from './shared/event.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModeSelectionComponent } from './mode-selection/mode-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrEventLogComponent } from './fr-event-log/fr-event-log.component';
import { PersonService } from './shared/person.service';
import { PersonFormularComponent } from './person-formular/person-formular.component';

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
    SettingspageComponent,
    StatusButtonComponent,
    ModeSelectionComponent,
    FrEventLogComponent,
    PersonFormularComponent,
    
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    UiSwitchModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmailService,
    SettingsService,
    EventService,
    AuthService,
    AuthGuard,
    PersonService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
