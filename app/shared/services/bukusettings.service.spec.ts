import { TestBed } from '@angular/core/testing';

import { BukusettingsService } from './bukusettings.service';

describe('BukusettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BukusettingsService = TestBed.get(BukusettingsService);
    expect(service).toBeTruthy();
  });
});
