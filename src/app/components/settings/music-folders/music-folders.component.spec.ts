import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicFoldersComponent } from './music-folders.component';

describe('MusicFoldersComponent', () => {
  let component: MusicFoldersComponent;
  let fixture: ComponentFixture<MusicFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
