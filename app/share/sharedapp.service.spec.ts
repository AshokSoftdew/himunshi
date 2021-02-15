import { TestBed } from '@angular/core/testing';

import { SharedappService } from './sharedapp.service';

describe('SharedappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedappService = TestBed.get(SharedappService);
    expect(service).toBeTruthy();
  });
});
