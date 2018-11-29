import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFoldersComponent } from './video-folders.component';

describe('VideoFoldersComponent', () => {
  let component: VideoFoldersComponent;
  let fixture: ComponentFixture<VideoFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
