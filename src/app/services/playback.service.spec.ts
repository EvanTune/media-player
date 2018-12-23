import { TestBed, inject } from '@angular/core/testing';

import { PlaybackService } from './playback.service';

describe('PlaybackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaybackService]
    });
  });

  it('should be created', inject([PlaybackService], (service: PlaybackService) => {
    expect(service).toBeTruthy();
  }));
});
