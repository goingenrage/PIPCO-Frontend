import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSettingsComponent } from './video-settings.component';
import { RangeSliderComponent } from '../range-slider/range-slider.component';
import { ModeSelectionComponent } from '../mode-selection/mode-selection.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('VideoSettingsComponent', () => {
  let component: VideoSettingsComponent;
  let fixture: ComponentFixture<VideoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [ 
        VideoSettingsComponent,
        RangeSliderComponent,
        ModeSelectionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
