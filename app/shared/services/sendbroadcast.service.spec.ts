import { TestBed } from '@angular/core/testing';

import { SendbroadcastService } from './sendbroadcast.service';

describe('SendbroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendbroadcastService = TestBed.get(SendbroadcastService);
    expect(service).toBeTruthy();
  });
});
