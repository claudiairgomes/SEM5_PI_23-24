import { TestBed } from '@angular/core/testing';

import { PassageService } from './passages.service';

describe('PassageService', () => {
  let service: PassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
