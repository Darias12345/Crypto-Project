import { TestBed } from '@angular/core/testing';

import { CryptoUpdateService } from './crypto-update.service';

describe('CryptoUpdateService', () => {
  let service: CryptoUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
