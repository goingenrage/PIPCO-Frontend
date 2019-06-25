import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrEventLogComponent } from './fr-event-log.component';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchComponent } from 'ngx-toggle-switch';
import { HttpClientModule } from '@angular/common/http';


describe('FrEventLogComponent', () => {
  let component: FrEventLogComponent;
  let fixture: ComponentFixture<FrEventLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],declarations: [ 
        FrEventLogComponent,
        TitleBarComponent,
        UiSwitchComponent
      ]
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
