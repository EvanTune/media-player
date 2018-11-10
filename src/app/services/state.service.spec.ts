import { TestBed, inject } from '@angular/core/testing';

import { StateService } from './list-grid-toggle.service';

describe('ListGridToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService]
    });
  });

  it('should be created', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
